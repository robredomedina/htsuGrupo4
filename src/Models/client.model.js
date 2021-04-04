const mongoose = require('mongoose');


const clientModelSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    hotspot_asteroids: { type: Number, required: true },
    price: { type: Number, required: true }
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
    Client.insertMany(clients);
};

const get = async (id) => {
    return await Client.findById(id);
}

module.exports = {
    create,
    update,
    remove,
    findAll,
    addList,
    get
};
