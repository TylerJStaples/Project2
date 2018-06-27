let path = require("path");
let db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/main.html"));
    });

    app.get("/map", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/mapExample.html"));
    });

    app.get("/api/allRestRooms", function(req, res) {
        db.Potty.findAll({}).then( function(restRooms) {
            console.log( `DEBUG - html-routes - # of Rest Rooms = ${restRooms.length}`);
            res.json(restRooms);
        });
    });

    app.get("/api/getRestroom/:id", function(req, res) {
        db.Potty.findOne({
            where: {
                id: req.params.id
            }
        }).then( function(potty) {
            res.json(potty);
        });
    });
};