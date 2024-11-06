const Tipo = require("../models/tipo");

exports.tipos = (req, res) => {
  Tipo.findAll()
    .then((tipos) => {
      const tiposPlain = tipos.map((tipo) => tipo.get()); 
      res.render("tipos/tipos", {
        pageTitle: "Lista de Tipos",
        tipos: tiposPlain,
      });
    })
    .catch((err) => console.log(err));
};

exports.createForm = (req, res) => {
  res.render("tipos/tipos-create", {
    pageTitle: "Crear Tipo",
  });
};

exports.create = (req, res) => {
  const { nombre } = req.body;

  Tipo.create({ nombre })
    .then(() => res.redirect("/tipos"))
    .catch((err) => console.log(err));
};

exports.editForm = (req, res) => {
  const id = req.params.id;

  Tipo.findByPk(id)
    .then((tipo) => {
      if (!tipo) return res.redirect("/tipos");

      const tipoPlain = tipo.get();  

      res.render("tipos/tipos-edit", {
        pageTitle: "Editar Tipo",
        tipo: tipoPlain,  
      });
    })
    .catch((err) => console.log(err));
};

exports.edit = (req, res) => {
  const id = req.params.id;
  const { nombre } = req.body;

  Tipo.update({ nombre }, { where: { id } })
    .then(() => res.redirect("/tipos"))
    .catch((err) => console.log(err));
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tipo.destroy({ where: { id } })
    .then(() => res.redirect("/tipos"))
    .catch((err) => console.log(err));
};
