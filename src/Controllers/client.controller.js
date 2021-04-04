const userModel = require("../Models/user.model");
const price = require('../Utils/price')

const create = (req, res) => {
    const newClient = req.body;
    // newClient.hotspots_asteroids(newClient.latitude, newClient.longitude)
    newClient.price = price(newClient.age, newClient.hotspots_asteroids);
    userModel.create(newClient);
    return res.status(201);
}

const get = async (req, res) => {
  const user = await userModel.get(req.params.id);
  return res.status(200).json(user);
};

const update = (req, res) => {
  const updatedUser = req.body;
  const userUpdated = userModel.update(req.params.id, updatedUser);
  return res.status(200).json(userUpdated);
};

const remove = (req, res) => {
  const userDeleted = userModel.remove(req.params.id);
  return res.status(200).json(userDeleted);
};

const findAll = async (req, res) => {
  const users = await userModel.findAll();
  return res.status(200).json(users);
};

const addList = (req, res) => {
  const usersCreated = userModel.addList(req.body.clients);
  return res.status(200).json(usersCreated);
};

module.exports = {
  update,
  get,
  remove,
  findAll,
  addList,
  create
};
