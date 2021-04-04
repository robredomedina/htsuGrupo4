const csv = require("csvtojson");

const addCSVtoDB = async (csvPath) => {
  await csv()
    .fromFile(csvPath)
    // .then((json) => asteroidModel.addList(json));
};

module.exports = addCSVtoDB;
