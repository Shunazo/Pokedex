const Pokemon = require("../models/pokemon");
const Tipo = require("../models/tipo");
const Region = require("../models/region");

exports.pokemones = (req, res) => {
  Pokemon.findAll({
    include: [
      { model: Tipo, as: 'tipo' },
      { model: Region, as: 'region' }
    ]
  })
  .then((pokemones) => {
    
    const plainPokemones = pokemones.map(pokemon => pokemon.get({ plain: true }));

    res.render("pokemones/pokemones", {
      pageTitle: "Lista de Pokemones",
      pokemones: plainPokemones,
    });
  })
  .catch((err) => console.log(err));
};


exports.createForm = (req, res) => {
  Promise.all([
    Tipo.findAll(),
    Region.findAll(),
  ])
  .then(([tipos, regiones]) => {
   
    const plainTipos = tipos.map(tipo => tipo.get({ plain: true }));
    const plainRegiones = regiones.map(region => region.get({ plain: true }));

    res.render("pokemones/pokemones-create", {
      pageTitle: "Crear Pokémon",
      tipos: plainTipos,
      regiones: plainRegiones,
    });
  })
  .catch((err) => console.log(err));
};


exports.create = (req, res) => {
  const { nombre, imagen, tipoId, regionId } = req.body;

  Pokemon.create({
    nombre,
    imagen,
    tipoId,  
    regionId,  
  })
  .then(() => res.redirect("/pokemones"))
  .catch((err) => console.log(err));
};

exports.editForm = (req, res) => {
  const id = req.params.id;

  Promise.all([
    Pokemon.findByPk(id, { include: ['tipo', 'region'] }),
    Tipo.findAll(),
    Region.findAll(),
  ])
  .then(([pokemon, tipos, regiones]) => {
    if (!pokemon) return res.redirect("/pokemones");

    const plainPokemon = pokemon.get({ plain: true });
    const plainTipos = tipos.map(tipo => tipo.get({ plain: true }));
    const plainRegiones = regiones.map(region => region.get({ plain: true }));

    
    plainTipos.forEach(tipo => {
      tipo.selected = tipo.id === plainPokemon.tipoId;
    });

    plainRegiones.forEach(region => {
      region.selected = region.id === plainPokemon.regionId;
    });

    res.render("pokemones/pokemones-edit", {
      pageTitle: "Editar Pokémon",
      pokemon: plainPokemon,
      tipos: plainTipos,
      regiones: plainRegiones,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send("Error fetching data");
  });
};





exports.edit = (req, res) => {
  const id = req.params.id;
  const { nombre, imagen, tipoId, regionId } = req.body;

  Pokemon.update(
    { nombre, imagen, tipoId, regionId },
    { where: { id } }
  )
  .then(() => res.redirect("/pokemones"))
  .catch((err) => console.log(err));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Pokemon.destroy({ where: { id } })
  .then(() => res.redirect("/pokemones"))
  .catch((err) => console.log(err));
};
