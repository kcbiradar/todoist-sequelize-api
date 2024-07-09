const express = require("express");

const router = express.Router();

const controller = require("../controllers/task.controller");

router.route("/").post(controller.create);

router.get("/all", controller.getAll);

router.get("/", controller.filterByIds);

router.put("/toggle/:id", controller.toggle);

router.get("/comment/:id", controller.getComments);

router.get("/label", controller.filterByLabels);

router.route("/:id").delete(controller.remove).put(controller.update);

module.exports = router;
