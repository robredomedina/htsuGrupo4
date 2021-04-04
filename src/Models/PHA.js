const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const PHASchema = mongoose.Schema(
  {
    full_name: { type: String, required: true, unique: true },
    a: { type: Number, required: true, min: 0 },
    e: { type: Number, required: true, min: 0, max: 1 },
    i: { type: Number, required: true, min: 0, max: 180 },
    om: { type: Number, required: true, min: 0, max: 360 },
    w: { type: Number, required: true, min: 0, max: 360 },
    ma: { type: Number, required: true, min: 0, max: 360 },
    Latitude: { type: Number, required: true, min: -90, max: 90 },
    Longitude: { type: Number, required: true, min: -180, max: 180 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Asteroid = mongoose.model("PHA", PHASchema);

const add = (asteroid) => {
  Asteroid.create(asteroid, (err, docs) => {
    if (err) {
      console.log(err);
      return {
        error: err.name,
        msg: err.message,
      };
    } else {
      console.log("Created docs: ", docs);
    }
  });
};

const addList = (asteroids) => {
  Asteroid.insertMany(asteroids);
};

const findByFullName = async (fullName) => {
  const query = { full_name: fullName };
  try {
    return await Asteroid.findOne(query);
  } catch (err) {
    console.log(err);
    return {
      error: err.name,
      msg: err.message,
    };
  }
};
const findAll = async () => {
  return await Asteroid.find();
};

const update = (id, data) => {
  let query = { _id: id };
  Asteroid.updateOne(query, data, (err, docs) => {
    if (err) {
      console.log(err);
      return {
        error: err.name,
        msg: err.message,
      };
    } else {
      console.log("Updated Docs: ", docs);
    }
  });
};

const remove = (id) => {
  let query = { _id: id };
  Asteroid.deleteOne(query, (err, docs) => {
    if (err) {
      console.log("error making request: ", err);
      return {
        error: err.name,
        msg: err.message,
      };
    } else {
      console.log("Deleted Doc: ", docs);
    }
  });
};

module.exports = {
  add,
  addList,
  findByFullName,
  findAll,
  remove,
  update,
};
