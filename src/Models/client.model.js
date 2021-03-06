const mongoose = require("mongoose");

const clientModelSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Lastname: { type: String, required: true },
  Age: { type: Number, required: true },
  Latitude: { type: Number, required: true, min: -90, max: 90 },
  Longitude: { type: Number, required: true, min: -180, max: 180 },
  Hotspot_asteroids: { type: Number, required: true },
  Price: { type: Number, required: true },
});

const Client = mongoose.model("ClientModel", clientModelSchema);

const create = (client) => {
  Client.create(client, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("docs: ", docs);
    }
  });
};

const update = async (id, updatedClient) => {
  Client.findByIdAndUpdate(id, updatedClient, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated Docs: ", docs);
    }
  });
};

const remove = (id) => {
  Client.findByIdAndDelete(id, function (err, docs) {
    if (err) {
      console.log("error making request: ", err);
    } else {
      console.log("Deleted Docs: ", docs);
    }
  });
};

const findAll = async () => {
  return await Client.find();
};

const addList = (clients) => {
  Client.insertMany(clients, { ordered: true });
};

const get = async (id) => {
  return await Client.findById(id);
};

const getByName = async (name) => {
  const query = { Name: name };
  return await Client.find(query);
};

module.exports = {
  create,
  update,
  remove,
  findAll,
  addList,
  get,
  getByName,
};
