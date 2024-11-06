const express = require("express");
const path = require("path");
const tipoController = require("../controllers/tipoController");

const router = express.Router();

router.get("/", tipoController.tipos);
router.get("/create", tipoController.createForm);
router.post("/create", tipoController.create);
router.get("/edit/:id", tipoController.editForm);
router.post("/edit/:id", tipoController.edit);
router.post("/delete/:id", tipoController.delete);

module.exports = router;