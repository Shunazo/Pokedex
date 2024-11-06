const Sequelize = require("sequelize");
const connection = require("../context/AppContext");

const Region = connection.define("region", {
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


Region.associate = (models) => {
   
    Region.hasMany(models.Pokemon, { 
        foreignKey: 'regionId', 
        as: 'pokemones',
        onDelete: 'CASCADE'  
    });
};

module.exports = Region;
