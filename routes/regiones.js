const express = require("express");
const path = require("path");

const router = express.Router();
const regionController = require("../controllers/regionController");

router.get("/", regionController.regiones);
router.get("/create", regionController.createForm);
router.post("/create", regionController.create);
router.get("/edit/:id", regionController.editForm);
router.post("/edit/:id", regionController.edit);
router.post("/delete/:id", regionController.delete);

module.exports = router;