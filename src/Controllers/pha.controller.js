const PHAModel = require('../Models/pha.model')

const PHAMethods = {
  add: async ( req, res ) => {
    try {
      const createdPHA = await PHAModel.add(req.body)
      console.log('Created PHA:', createdPHA)
      res.status(createdPHA.error? 400:201).json(createdPHA)
    } catch (err) {
      console.log(err)
      res.status(500).json(`An error ocurred`); //ToDo agregar un mensaje más explicativo
    }
  },
  addList: async ( req, res ) => {
    try {
      const createdPHAs = await PHAModel.addList(req.body);
      res.status(createdPHAs.error? 400 : 201).json(createdPHAs);
    } catch (err) {
      console.log(err)
      res.status(500).json(`An error ocurred`); //ToDo agregar un mensaje más explicativo
    }
  },
  findByFullName: async (req, res) => {
    try {
      const foundPHA = await PHAModel.findByFullName(req.params.PHAName);
      res.status(foundPHA.error? 400 : 200).json(foundPHA);
    } catch (err) {
      console.log(err)
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
      console.log(err)
      res.status(500).json(`An error ocurred`); //ToDo agregar un mensaje más explicativo
    }
  },
  update: async ( req, res ) => {
    try {
      const updatedPHA = await PHAModel.update(req.params.PHAId, req.body)
      res.status(updatedPHA.error? 400:200).json(updatedPHA);
    } catch (err) {
      console.log(err)
      res.status(500).json(`An error ocurred`); //ToDo agregar un mensaje más explicativo
    }
  },
}


module.exports = PHAMethods