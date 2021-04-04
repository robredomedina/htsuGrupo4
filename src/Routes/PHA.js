const express = require("express");
const router = express.Router();
const {
  add,
  addList,
  find,
  findAll,
  remove,
  update,
} = require("../controllers/PHA.js");

router
  .get("/findAll", findAll)
  .get("/find", find)
  .put("/add", add)
  .put("/addList", addList)
  .post("/update/:PHAId", update)
  .delete("/remove/:PHAId", remove);

module.exports = router;
