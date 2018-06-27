var express = require("express");
var bodyParser = require("body-parser");
var app = express();
//PORT
var PORT = process.env.PORT || 8080;
//models
var db = require("./models");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//directory
app.use(express.static("public"));

//routes
require("./routes/html-routes.js")(app);

 db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
 });