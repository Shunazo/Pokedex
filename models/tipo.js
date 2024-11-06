const Sequelize = require("sequelize");
const connection = require("../context/AppContext");

const Tipo = connection.define("tipo", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


Tipo.associate = (models) => {
    Tipo.hasMany(models.Pokemon, { 
        foreignKey: 'tipoId', 
        as: 'pokemones',
        onDelete: 'CASCADE' 
    });
};

module.exports = Tipo;
