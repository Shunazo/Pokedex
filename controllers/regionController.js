const Region = require("../models/region");

exports.regiones = async(req, res) => {
  try{
    const regiones = await Region.findAll();

    const regionesPlain = regiones.map(region => region.get());

    res.render("regiones/regiones", {
      pageTitle: "Lista de Regiones",
      regiones: regionesPlain,
    });
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde."
  });
    console.log(err);
  }
};

//form de creacion
exports.createForm = (req, res) => {
  res.render("regiones/regiones-create", {
    pageTitle: "Crear Region",
  });
};

//creacion en si 
exports.create = async (req, res) => {
  try {
    const { nombre } = req.body;  

    await Region.create({
      nombre,
    });

    res.redirect("/regiones");
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde."
    })
    console.log(err);
  }
};

//form de edicion
exports.editForm = async(req, res) => {
  try{
    const id = req.params.id;
    const region = await Region.findByPk(id);

    if (!region) return res.redirect("/regiones");

    const regionPlain = region.get(); 

    res.render("regiones/regiones-edit", {
      pageTitle: "Editar Region",
      region: regionPlain,  
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
  try {
    const id = req.params.id;
    const region = await Region.findByPk(id);

    if (!region) return res.redirect("/regiones");

    const { nombre } = req.body;

    await Region.update({ nombre }, { where: { id } });

    res.redirect("/regiones");
  } catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde."
  });
    console.log(err); 
  }
};

//delete en si
exports.delete = async(req, res) => {
  try {
    const id = req.params.id;
    
    await Region.destroy({ where: { id }});
    res.redirect("/regiones");
  }
  catch (err) {
    res.render("404", {
      pageTitle: "Se produjo un error, vuelva al home o intente mas tarde."
  });
    console.log(err);
  }
};