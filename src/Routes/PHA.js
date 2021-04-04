const express = require("express");
const router = express.Router();
const {
  add,
  addList,
  findByFullName,
  findAll,
  remove,
  update,
} = require('../Controllers/PHA');

router
  .get("/findAll", findAll)
  .get("/find/:PHAName", findByFullName)
  .put("/add", add)
  .put("/addList", addList)
  .post("/update/:PHAId", update)
  .delete("/remove/:PHAId", remove);

module.exports = router;
