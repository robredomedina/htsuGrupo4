const PHAModel = require('../Models/PHA')

const PHAMethods = {
  add: async ( req, res ) => {
    try {
      const PHAExists = PHAModel.findByFullName(req.body.full_name);
      if(PHAExists) return res.status(400).json("Asteroid already exists");
      const createdPHA = await PHAModel.add(req.body)
      res.status(createdPHA.error? 400 : 201).json(createdNEA)
    } catch (err) {
      res.status(500).json(`An error ocurred`); //ToDo agregar un mensaje más explicativo
    }
  },
  addList: async ( req, res ) => {
    try {
      const createdPHAs = await PHAModel.addList(req.body.asteroids);
      res.status(createdPHAs.error? 400 : 201).json(createdPHAs);
    } catch (err) {
      res.status(500).json(`An error ocurred`); //ToDo agregar un mensaje más explicativo
    }
  },
  findByFullName: async (req, res) => {
    try {
      const PHA = await PHAModel.findByFullName(req.body.full_name);
      res.status(PHA.error? 400 : 200).json(PHA);
    } catch (err) {
      res.status(500).json(`An error ocurred`); //ToDo agregar un mensaje más explicativo
    }
  },
  findAll: async ( req, res ) => {
    try {
      const allPHAs = await PHAModel.findAll();
      res.status(allPHAs.error? 400 : 200).json(allPHAs);
    } catch (err) {
      res.status(500).json(`An error ocurred`); //ToDo agregar un mensaje más explicativo
    }
  },
  remove: async ( req, res ) => {
    try {
      const removedPHA = await PHAModel.remove(req.params.PHAId);
      res.status(removedPHA.error? 400:200).json(removedPHA);
    } catch (err) {
      res.status(500).json(`An error ocurred`); //ToDo agregar un mensaje más explicativo
    }
  },
  update: async ( req, res ) => {
    try {
      const updatedPHA = await PHAModel.update(req.params.PHAId, req.body)
      res.status(removedPHA.error? 400:200).json(updatedPHA);
    } catch (err) {
      res.status(500).json(`An error ocurred`); //ToDo agregar un mensaje más explicativo
    }
  },
}


module.exports = PHAMethods