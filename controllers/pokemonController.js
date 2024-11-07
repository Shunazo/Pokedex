const Pokemon = require("../models/pokemon");
const Tipo = require("../models/tipo");
const Region = require("../models/region");

exports.pokemones = async (req, res) => {
  try {
    const pokemones = await Pokemon.findAll({
      include: [
        { model: Tipo, as: 'tipo' },
        { model: Region, as: 'region' }
      ]
    });

    const plainPokemones = pokemones.map(pokemon => pokemon.get({ plain: true }));

    res.render("pokemones/pokemones", {
      pageTitle: "Lista de Pokemones",
      pokemones: plainPokemones,
    });
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde."
    });
    console.log(err);
  }
};

//form de creacion
exports.createForm = async (req, res) => {
  try {
    const [tipos, regiones] = await Promise.all([
      Tipo.findAll(),
      Region.findAll(),
    ]);

    const plainTipos = tipos.map(tipo => tipo.get({ plain: true }));
    const plainRegiones = regiones.map(region => region.get({ plain: true }));

    res.render("pokemones/pokemones-create", {
      pageTitle: "Crear Pokemon",
      tipos: plainTipos,
      regiones: plainRegiones,
    });
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde."
    });
    console.log(err);
  } 
};
  
 //creacion en si 
exports.create = async (req, res) => {
  try {
    const { nombre, imagen, tipoId, regionId } = req.body;

    await Pokemon.create({
      nombre,
      imagen,
      tipoId,  
      regionId,  
    });

    res.redirect("/pokemones");
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde."
    })
  }
};

//form de edicion
exports.editForm = async (req, res) => {
  try {
    const id = req.params.id;
    const [pokemon, tipos, regiones] = await Promise.all([
      Pokemon.findByPk(id, { include: ['tipo', 'region'] }),
      Tipo.findAll(),
      Region.findAll(),
    ]);

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
      pageTitle: "Editar Pokemon",
      pokemon: plainPokemon,
      tipos: plainTipos,
      regiones: plainRegiones,
    });
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde."
    });
    console.log(err);
  }
};

//edicion en si 
exports.edit = async(req, res) => {
  try{
    const id = req.params.id;
    const { nombre, imagen, tipoId, regionId } = req.body;

    await Pokemon.update(
      { nombre, imagen, tipoId, regionId },
      { where: { id } }
    );

    res.redirect("/pokemones");
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde."
    });
    console.log(err);
  }
};


//delete en si 
exports.delete = async(req, res) => {
  try{
    const id = req.params.id;

    await Pokemon.destroy({ where: { id } });
    res.redirect("/pokemones");
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde."
    });
    console.log(err);
  }
};