const Sequelize = require("sequelize");
const connection = require("../context/AppContext");

const Pokemon = connection.define("pokemon", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imagen: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipoId: {  
        type: Sequelize.INTEGER,
        allowNull: false
    },
    regionId: {  
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Pokemon.associate = (models) => {
    Pokemon.belongsTo(models.Tipo, { 
        foreignKey: 'tipoId', 
        as: 'tipo',
        onDelete: 'CASCADE'
    });
    Pokemon.belongsTo(models.Region, { 
        foreignKey: 'regionId', 
        as: 'region',
        onDelete: 'CASCADE' 
    });
};

module.exports = Pokemon;
