const get = (req, res) => {
    //console.log("reached here")
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
};

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.

const cb = (req, res) => {
    res.redirect('/');
};

module.exports = {
    get,
    cb
};