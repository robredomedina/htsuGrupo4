const express = require("express");
const router = express.Router();
const {
  add,
  addList,
  findByFullName,
  findAll,
  remove,
  update,
} = require("../Controllers/pha.controller");

router
  .get("/findAll", findAll)
  .get("/find/:PHAName", findByFullName)
  .post("/add", add)
  .post("/addList", addList)
  .put("/update/:PHAId", update)
  .delete("/remove/:PHAId", remove);

module.exports = router;
