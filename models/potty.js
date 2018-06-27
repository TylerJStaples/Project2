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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Potty.associate = function(models){
        Potty.hasMany(models.reviews, {
            onDelete: "cascade",
        });
    }

    return Potty;
}