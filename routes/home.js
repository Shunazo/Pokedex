const express = require("express");
const path = require("path");

const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.GetIndex);

module.exports = router;