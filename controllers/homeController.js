const Pokemon = require("../models/pokemon");
const Tipo = require("../models/tipo");
const Region = require("../models/region");

exports.GetIndex = (req, res) => {
    const searchQuery = req.query.search ? req.query.search.toLowerCase() : '';
    const tipoFilter = req.query.tipo;
    const regionFilter = req.query.region;

    Pokemon.findAll({
      include: [
        { model: Tipo, as: 'tipo' },
        { model: Region, as: 'region' }
      ]
    })
    .then((pokemones) => {
      return Promise.all([pokemones, Tipo.findAll(), Region.findAll()]);
    })
    .then(([pokemones, tipos, regiones]) => {

      
      const plainTipos = tipos.map((tipo) => tipo.get({ plain: true }));
      const plainRegiones = regiones.map((region) => region.get({ plain: true }));

      let updatedPokemones = pokemones.map((pokemon) => {
        const tipo = plainTipos.find((t) => t.id === pokemon.tipo.id);
        const region = plainRegiones.find((r) => r.id === pokemon.region.id); 

        return {
          ...pokemon.dataValues,
          tipoName: tipo ? tipo.nombre : "Tipo Desconocido",  
          regionName: region ? region.nombre : "Region Desconocida", 
        };
      });

    
      if (searchQuery) {
        updatedPokemones = updatedPokemones.filter((pokemon) =>
          pokemon.nombre.toLowerCase().includes(searchQuery)
        );
      }

      if (tipoFilter) {
        updatedPokemones = updatedPokemones.filter(
          (pokemon) => pokemon.tipoName === tipoFilter
        );
      }

      if (regionFilter) {
        updatedPokemones = updatedPokemones.filter(
          (pokemon) => pokemon.regionName === regionFilter
        );
      }

      res.render("home", {
        pageTitle: "Home",
        pokemones: updatedPokemones,
        tipos: plainTipos,
        regiones: plainRegiones,
      });
    })
    .catch((err) => console.log(err));
};
