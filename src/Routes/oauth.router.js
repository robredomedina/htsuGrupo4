const { Router } = require("express");
const oauthController = require("../Controllers/oauth.controller");
const passport = require('passport');

const router = Router();
const GitHubStrategy = require('passport-github2').Strategy;
const config = require("../Config/config.js");
const dotenv = require("dotenv");

dotenv.config();

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `http://localhost:${config.port}/api/oauth/github/callback`
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile);
        /*         User.findOrCreate({ githubId: profile.id }, function(err, user) {
                    return done(err, user);
                }); */
    }
));

router.route("/github").get(passport.authenticate('github', { scope: ['user:email'] }), oauthController.get)

router.route("/github/callback").get(passport.authenticate('github', { failureRedirect: '/login' }), oauthController.cb)

module.exports = router;