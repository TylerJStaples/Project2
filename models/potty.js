//
module.exports = function(sequelize, DataTypes){
    var Potty = sequelize.define("Potty", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        lng: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        zIndex: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Potty.associate = function(models){
        Potty.hasMany(models.Reviews, {
            onDelete: "cascade"
        });
    };

    return Potty;
};