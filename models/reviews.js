module.exports = function(sequelize, DataTypes){
    var Reviews = sequelize.define("Reviews", {
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        starRating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        submittedBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Reviews;
}