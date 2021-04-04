const { body2latlong } = require("keplerjs");

const phaPosition = (pha) => {
  const position = body2latlong(pha);
  position.lat = position.lat / 2;
  if (position.lat > 90) position.lat -= 180;
  else if (position.lat < -90) position.lat += 180;
  if (position.long > 180) position.long -= 180;
  else if (position.long < -180)position.long += 180;
  return position;
};

module.exports = phaPosition;
