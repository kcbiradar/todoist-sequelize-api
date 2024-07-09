const express = require("express");

const router = express.Router();

const controller = require("../controllers/comment.controller");

router.route("/").post(controller.create);

router
  .route("/:id")
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.remove);

module.exports = router;
