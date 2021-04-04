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

module.exports = mongoose.model("PHA", NEASchema);
