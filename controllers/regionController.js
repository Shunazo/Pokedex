const Region = require("../models/region");

exports.regiones = (req, res) => {
  Region.findAll()
    .then((regiones) => {
      const regionesPlain = regiones.map(region => region.get()); 
      res.render("regiones/regiones", {
        pageTitle: "Lista de Regiones",
        regiones: regionesPlain,
      });
    })
    .catch((err) => console.log(err));
};

exports.createForm = (req, res) => {
  res.render("regiones/regiones-create", {
    pageTitle: "Crear Region",
  });
};

exports.create = (req, res) => {
  const { nombre } = req.body;

  Region.create({ nombre })
    .then(() => res.redirect("/regiones"))
    .catch((err) => console.log(err));
};

exports.editForm = (req, res) => {
  const id = req.params.id;

  Region.findByPk(id)
    .then((region) => {
      if (!region) return res.redirect("/regiones");

      const regionPlain = region.get(); 

      res.render("regiones/regiones-edit", {
        pageTitle: "Editar Region",
        region: regionPlain,  
      });
    })
    .catch((err) => console.log(err));
};

exports.edit = (req, res) => {
  const id = req.params.id;
  const { nombre } = req.body;

  Region.update({ nombre }, { where: { id } })
    .then(() => res.redirect("/regiones"))
    .catch((err) => console.log(err));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Region.destroy({ where: { id } })
    .then(() => res.redirect("/regiones"))
    .catch((err) => console.log(err));
};
