const express = require("express");

const router = express.Router();

const controller = require("../controllers/label.controller");

router.get("/", (request, response) => {
  response.send("Hello world from Label router");
});

router.post("/", controller.create);
router.get("/:id", controller.getAll);

module.exports = router;
