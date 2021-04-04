const clientModel = require("../Models/client.model");
const hotspots = require("../Utils/hotspots");
const price = require("../Utils/price");

const create = async (req, res) => {
  const newClient = req.body;
  try {
    if (
      !newClient.Name ||
      !newClient.Lastname ||
      !newClient.Age ||
      !newClient.Latitude ||
      !newClient.Longitude
    ) {
      return res.status(400).json("Incorrect user data");
    }
    const clientList = await clientModel.getByName(newClient.Name);
    let clientExists = false;
    clientList.forEach((client) => {
      if (newClient.Lastname === client.Lastname) {
        clientExists = true;
      }
    });
    if (clientExists) {
      return res.status(400).json("Client already exists");
    } else {
      const Hotspot_asteroids = await hotspots(newClient.Latitude, newClient.Longitude)
        .then((Hotspot_asteroids) => {
          newClient.Hotspot_asteroids = Hotspot_asteroids
          newClient.Price = price(newClient.Age, Hotspot_asteroids);
          clientModel.create(newClient);
        })

      return res.status(201).json(newClient);
    }
  } catch (err) {
    console.log(err);
  }
};

const get = async (req, res) => {
  const client = await clientModel.get(req.params.id);
  return res.status(200).json(client);
};

const update = (req, res) => {
  const updatedUser = req.body;
  const clientUpdated = clientModel.update(req.params.id, updatedUser);
  return res.status(200).json(clientUpdated);
};

const remove = (req, res) => {
  const clientDeleted = clientModel.remove(req.params.id);
  return res.status(200).json(clientDeleted);
};

const findAll = async (req, res) => {
  const clients = await clientModel.findAll();
  return res.status(200).json(clients);
};

const addList = async (req, res) => {
  try {
    const newClients = req.body.newClients;
    let errorInList = false;
    newClients.forEach((newClient, i) => {
      if (
        !newClient.Name ||
        !newClient.Lastname ||
        !newClient.Age ||
        !newClient.Latitude ||
        !newClient.Longitude
      ) {
        newClient.Hotspot_asteroids = 0;
        newClient.price = 0;
        errorInList = true;
      } else {
        hotspots(newClient.Latitude, newClient.Longitude)
          .then((Hotspot_asteroids) => {
            newClient.Hotspot_asteroids = Hotspot_asteroids
            newClient.Price = price(newClient.Age, Hotspot_asteroids);
            console.log("test2: ", newClient);
          })
      }
    });
    console.log("test: ", newClients);
    if (errorInList) {
      return res.status(400).json("There were invalid clients in the list");
    } else {
      return res.status(201).json("ok");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  update,
  get,
  remove,
  findAll,
  addList,
  create,
};
