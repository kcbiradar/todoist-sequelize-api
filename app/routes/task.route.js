const express = require("express");

const router = express.Router();

const controller = require('../controllers/task.controller');

router.route("/")
.post(controller.create)

router.get('/project/:id' , controller.filterByProjectId)

router.get('/section/:id' , controller.filterBySectionId)

router.get('/label' , controller.filterByLabels)

router.route("/:id")
.delete(controller.remove)
.put(controller.update)

module.exports = router;
