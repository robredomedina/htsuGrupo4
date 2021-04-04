const PHAModel = require("../Models/pha.model");

const hotspots = async (lat, long) => {
  let phaNumber = 0;

  const phaList = await PHAModel.findAll();

  phaList.forEach((pha) => {
    if ( pha.Latitude <= (lat + 15) && pha.Latitude >= (lat - 15) &&
      (pha.Longitude <= (long + 15) && pha.Longitude >= long - 15)
    ) {
      phaNumber++;
    }
  });
  return phaNumber;
};

module.exports = hotspots;
