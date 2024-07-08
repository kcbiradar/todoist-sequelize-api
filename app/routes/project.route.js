const express = require("express");

const router = express.Router();

const controller = require("../controllers/project.controller");

router.route("/")
.post(controller.create)
.get(controller.getAll)

router.route("/showProject")
.get(controller.getOne)

router.route("/:id")
.put(controller.update)
.delete(controller.remove)

module.exports = router;
