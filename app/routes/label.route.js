const express = require("express");

const router = express.Router();

const controller = require("../controllers/label.controller");

router.post("/", controller.create);
router.get("/:id", controller.getAll);

router

module.exports = router;
