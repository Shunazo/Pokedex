const express = require("express");
const path = require("path");
const app = express();
const connection = require("./context/AppContext");
const { engine } = require("express-handlebars");
const Pokemon = require("./models/pokemon");
const Region = require("./models/region");
const Tipo = require("./models/tipo");

const homeRoute = require("./routes/home");
const pokemonRoute = require("./routes/pokemones");
const regionRoute = require("./routes/regiones");
const tipoRoute = require("./routes/tipos");
const errorController = require("./controllers/errorController");
const PORT = 3000;
app.engine(
    "hbs",
    engine({
        layoutsDir: "views/layouts",
        defaultLayout: "main",
        extname: "hbs",
    })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRoute);
app.use("/pokemones", pokemonRoute);
app.use("/regiones", regionRoute);
app.use("/tipos", tipoRoute);

app.use(errorController.Get404);

Pokemon.associate({ Tipo, Region });
Region.associate({ Pokemon });
Tipo.associate({ Pokemon });

connection
    .sync()
    .then((result) => {
        console.log(`App is running on port ${PORT}`)
        app.listen(PORT);
    })
    .catch((err) => {
        console.log(err);
});
    
