const csv = require("csvtojson");
const clientModel = require("../Models/client.model");
const phaModel = require("../Models/pha.model");
const price = require("./price");
const phaPosition = require('./phaPosition');
const hotspots = require("./hotspots");

const phaAddList = (json) => {

  json.forEach(  (newPha) => {
    const position = phaPosition(newPha);
      newPha.Latitude = position.lat;
      newPha.Longitude = position.long;
  });
  phaModel.addList(json);
};

const clientAddList =  (json) => {
  json.forEach( (newClient) => {
  hotspots(newClient.Latitude, newClient.Longitude)
    .then((hotspotsNumber)=> {
      newClient.Hotspot_asteroids =  hotspotsNumber;
      newClient.Price = price(newClient.Age, newClient.Hotspot_asteroids);
      clientModel.create(newClient)
    });
  })
}



const addCSVtoDB = async (csvPath, clients) => {
  if (clients) {
    await csv()
      .fromFile(csvPath)
      .then((json) => clientAddList(json));
  } else {
    await csv().fromFile(csvPath)
    .then((json) => phaAddList(json));
  }
};

module.exports = addCSVtoDB;
