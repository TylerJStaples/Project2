module.exports = function(sequelize, DataTypes){
    var Potty = sequelize.define("Potty", function(){
        //placeholder variable
        location: DataTypes.STRING
    });
    return Potty;
}