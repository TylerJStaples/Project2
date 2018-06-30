let path = require("path");

var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyA2_tnNsCgwOh6gNQIhuBPu5dzrtdctTEU",
    authDomain: "in-a-pinch-project-2.firebaseapp.com",
    databaseURL: "https://in-a-pinch-project-2.firebaseio.com",
    projectId: "in-a-pinch-project-2",
    storageBucket: "in-a-pinch-project-2.appspot.com",
    messagingSenderId: "674290992138"
};
firebase.initializeApp(config);

const auth = firebase.auth();

const email = "testtaw1@gmail.com"
const pass = "generic";

auth.signInWithEmailAndPassword( email, pass)
.then( user => {
      console.log("!!Logged in!!!");
  })
  .catch( err => {
      console.log( "Failed to log in" );
      console.log( err.message );
  });

module.exports = function(app) {

    app.get("/api/getAuthUser", function(req, res) {
        console.log("DEBUG - getAuthUsers route")
    });

};