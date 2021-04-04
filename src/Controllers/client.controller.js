const clientModel = require("../Models/client.model");
const price = require('../Utils/price')

const create = (req, res) => {
    const newClient = req.body;
    // newClient.hotspots_asteroids(newClient.latitude, newClient.longitude)
    newClient.Hotspot_asteroids = 10;
    newClient.Price = price(newClient.age, newClient.hotspot_asteroids);
    console.log(newClient);
    clientModel.create(newClient);
    return res.status(201).json(newClient);
}

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

const addList = (req, res) => {
  newClients = req.body.newClients;
  newClients.forEach((newClient) => {
        // newClient.hotspots_asteroids(newClient.latitude, newClient.longitude)
        newClient.hotspot_asteroids = 10;
        newClient.price = price(newClient.age, newClient.hotspot_asteroids);
  });
  const clientsCreated = clientModel.addList(newClients);
  return res.status(200).json(clientsCreated);
};

module.exports = {
  update,
  get,
  remove,
  findAll,
  addList,
  create
};
