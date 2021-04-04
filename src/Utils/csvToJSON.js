const csv = require("csvtojson");
const clientModel = require("../Models/client.model");
const price = require("./price");

const clientAddList = (json) => {
  json.forEach((newClient) => {
    // newClient.hotspots_asteroids(newClient.latitude, newClient.longitude)
    newClient.Hotspot_asteroids = 10;
    newClient.Price = price(newClient.Age, newClient.Hotspot_asteroids);
  });
  clientModel.addList(json);
};

const addCSVtoDB = async (csvPath, clients) => {
  if (clients) {
    await csv()
      .fromFile(csvPath)
      .then((json) => clientAddList(json));
  } else {
    await csv().fromFile(csvPath);
    // .then((json) => asteroidController.addList(json));
  }
};

module.exports = addCSVtoDB;
