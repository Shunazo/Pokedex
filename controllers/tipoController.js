const Tipo = require("../models/tipo");

exports.tipos = async(req, res) => {
  try{
    const tipos = await Tipo.findAll();
    
    const tiposPlain = tipos.map(tipo => tipo.get());

    res.render ("tipos/tipos", {
      pageTitle: "Lista de Tipos",
      tipos: tiposPlain,
    });
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde.",
    });
    console.log(err);
  }
};


//form de creacion
exports.createForm = (req, res) => {
  res.render("tipos/tipos-create", {
    pageTitle: "Crear Tipo",
  });
};

//creacion en si
exports.create = async(req, res) => {
  try{
    const { nombre } = req.body;

    await Tipo.create({ nombre });

    res.redirect("/tipos");
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde.",
    });
    console.log(err);
  }
};


//form de edicion
exports.editForm = async (req, res) => {
  try{
    const id = req.params.id;
    const tipo = await Tipo.findByPk(id);

    if (!tipo) return res.redirect("/tipos");
    
    const tipoPlain = tipo.get();

    res.render("tipos/tipos-edit", {
      pageTitle: "Editar Tipo",
      tipo: tipoPlain,  
    });
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde.",
    });
    console.log(err);
  }
};

//edicion en si
exports.edit = async (req, res) => {
  try{
    const id = req.params.id;
    const { nombre } = req.body;

    await Tipo.update({ nombre }, { where: { id } });

    res.redirect("/tipos");
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde.",
    });
    console.log(err);
  }
};


exports.delete = async (req, res) => {
  try{
    const id = req.params.id;

    await Tipo.destroy({ where: { id } });
    res.redirect("/tipos");
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde.",
    });
    console.log(err);
  }   
};