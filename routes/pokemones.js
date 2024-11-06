const express = require("express");
const path = require("path");

const router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.get("/", pokemonController.pokemones);
router.get("/create", pokemonController.createForm);
router.post("/create", pokemonController.create);
router.get("/edit/:id", pokemonController.editForm);
router.post("/edit/:id", pokemonController.edit);
router.post("/delete/:id", pokemonController.delete);

module.exports = router;