// Initialize Firebase (config & env didn't work, will switch keys once app is working)
// var apiKey = config.apiKey;
// var authDomain = config.authDomain;
// var databaseURL = config.databaseURL;
// var projectId = config.projectId;
// var storageBucket = config.storageBucket;
// var messagingSenderId = config.messagingSenderId;

var config = {
    apiKey: "AIzaSyA2_tnNsCgwOh6gNQIhuBPu5dzrtdctTEU",
    authDomain: "in-a-pinch-project-2.firebaseapp.com",
    databaseURL: "https://in-a-pinch-project-2.firebaseio.com",
    projectId: "in-a-pinch-project-2",
    storageBucket: "in-a-pinch-project-2.appspot.com",
    messagingSenderId: "674290992138"
};
firebase.initializeApp(config);
// Get a reference to the database service
// var database = firebase.database(); //added

///////////////////////////////////////////////////////
// Get elements
///////////////////////////////////////////////////////
const userEmail = document.getElementById('userEmail'); //registered user
const userPassword = document.getElementById('userPassword'); //registered user
//--------------------------------------------------------
const txtUsername = document.getElementById('txtUsername'); //new user
const txtEmail = document.getElementById('txtEmail'); //new user
const txtPassword = document.getElementById('txtPassword'); //new user
//--------------------------------------------------------
const btnLogin = document.getElementById('btnLogin');
const btnRegister = document.getElementById('btnRegister');
const btnLogout = document.getElementById('btnLogout');

$(document).ready(function () {
    /////////////////////////////////////////////////////// 
    //Add login event
    ///////////////////////////////////////////////////////

    btnLogin.addEventListener('click', e => {
        // Get email and pass
        const email = userEmail.value;
        const pass = userPassword.value;
        const auth = firebase.auth();

        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(function (error) {
            // Handle error
            var errorCode = error.code;
            var errorMessage = error.message;

            $("#exampleModal").modal();
            // alert("You look a little flushed! The email you entered is not correct. Try again!");
            console.log(errorMessage);
        });
        // alert(errorMessage);
        console.log(errorMessage);
    });

    ///////////////////////////////////////////////////////
    // Add login to signup event
    ///////////////////////////////////////////////////////
    // sign-up.addEventListener('click', e => {
    //     $('.log-section').addClass('hide');
    //     $('#signupDiv').fadeIn('slow').removeClass('hide');
    // });


    $('#sign-up').click(function () {
        $('.log-section').hide();
        $('#signupDiv').show("slow");
    });


    ///////////////////////////////////////////////////////
    // Add signup event
    ///////////////////////////////////////////////////////
    function register(e) {
        // Get username, email, and pass
        // const username = txtUsername.value; //added, not working yet
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    }

    // btnRegister.addEventListener('click', e => {
    //     // Get username, email, and pass
    //     // const username = txtUsername.value; //added, not working yet
    //     const email = txtEmail.value;
    //     const pass = txtPassword.value;
    //     const auth = firebase.auth();

    //     // Sign in
    //     const promise = auth.createUserWithEmailAndPassword(email, pass);
    //     promise.catch(e => console.log(e.message));
    // });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });


    ///////////////////////////////////////////////////////
    // Add a realtime listener
    ///////////////////////////////////////////////////////

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            document.getElementById("user_div").style.display = "block";
            document.getElementById("main_div").style.display = "none";

            var user = firebase.auth().currentUser;

            if (user != null) {
                var email_id = user.email;

                document.getElementById("user_para").innerHTML = "Welcome User: " + email_id;
            }
        } else {
            // No user is signed in.
            console.log("not logged in");
            document.getElementById("user_div").style.display = "none";
            document.getElementById("main_div").style.display = "block";
        }
    });
});