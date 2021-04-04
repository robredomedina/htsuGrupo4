const { Router } = require("express");
const clientController = require("../Controllers/client.controller");

const router = Router();

router.route("/")
  .get(clientController.findAll)
  .post(clientController.create);

router.route("/addList").post(clientController.addList);

router
  .route("/:id")
  .get(clientController.get)
  .patch(clientController.update)
  .delete(clientController.remove);

module.exports = router;
