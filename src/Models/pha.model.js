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

const Asteroid = mongoose.model("phas", PHASchema);

const add = async (asteroid) => {
  try {
    return createdPHA = await Asteroid.create(asteroid)  
  } catch (err) {
    return {
      error: err.name,
      msg: err.message
    }
  }  
};

const addList = async (asteroids) => {
  try {
    return createdPHAs = await Asteroid.insertMany(asteroids);
  } catch (err) {
    return {
      error: err.name,
      msg: err.message
    }
  }
};

const findByFullName = async (fullName) => {
  const query = { full_name: fullName };
  try {
    return foundNEA = await Asteroid.findOne(query)
  } catch (err) {
    console.log(err);
    return {
      error: err.name,
      msg: err.message,
    };
  }
};
const findAll = async () => {
  try {
    return await Asteroid.find();
  } catch (err) {
    return {
      error: err.name,
      msg: err.message,
    };
  }
};

const update = (id, data) => {
  let query = { _id: id };
  try {
    return Asteroid.updateOne(query, data);
  } catch (err) {
    return {
      error: err.name,
      msg: err.message,
    };
  }
};

const remove = (id) => {
  let query = { _id: id };
  try {
    return Asteroid.deleteOne(query);
  } catch (err) {
    return {
      error: err.name,
      msg: err.message,
    };
  };
};

module.exports = {
  add,
  addList,
  findByFullName,
  findAll,
  remove,
  update,
};
