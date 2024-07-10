const express = require("express");

const router = express.Router();

const controller = require("../controllers/task.controller");

router.route("/").get(controller.filterByIds).post(controller.create);

router.get("/all", controller.getAll);

router.put("/toggle/:id", controller.toggle);

router.get("/:id/comment", controller.getComments);

router.get("/label", controller.filterByLabels);

router.route("/:id").delete(controller.remove).put(controller.update);

module.exports = router;
