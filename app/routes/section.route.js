const express = require("express");

const router = express.Router();

const controller = require("../controllers/section.controller");

router.route("/").post(controller.create);

router.get("/all/:project_id", controller.getAll);

router
  .route("/:id")
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.remove);

module.exports = router;
