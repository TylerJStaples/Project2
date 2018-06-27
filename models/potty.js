module.exports = function(sequelize, DataTypes){
    var Potty = sequelize.define("Potty", {
        lat: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        lng: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        zINdex: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    });
}