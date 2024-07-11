const express = require("express");

const router = express.Router();

const controller = require("../controllers/project.controller");

router.route("/showProject").get(controller.getOne);

router.route("/:user_id").post(controller.create).get(controller.getAll);

router.route("/:id").put(controller.update).delete(controller.remove);

router.get("/:id/comment", controller.getComments);

module.exports = router;
