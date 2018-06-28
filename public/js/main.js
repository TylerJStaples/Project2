// Initialize Firebase (config & env didn't work, will switch keys once app is working)
// var apiKey = config.apiKey;
// var authDomain = config.authDomain;
// var databaseURL = config.databaseURL;
// var projectId = config.projectId;
// var storageBucket = config.storageBucket;
// var messagingSenderId = config.messagingSenderId;

/* Candace's
*/
var config = {
    apiKey: "AIzaSyA2_tnNsCgwOh6gNQIhuBPu5dzrtdctTEU",
    authDomain: "in-a-pinch-project-2.firebaseapp.com",
    databaseURL: "https://in-a-pinch-project-2.firebaseio.com",
    projectId: "in-a-pinch-project-2",
    storageBucket: "in-a-pinch-project-2.appspot.com",
    messagingSenderId: "674290992138"
};
/* Todd's
var config = {
    apiKey: "AIzaSyDUWLn9TlTiPbRUKh0lypHoKXeSQSG_FUs",
    authDomain: "inapinch-1529857093090.firebaseapp.com",
    databaseURL: "https://inapinch-1529857093090.firebaseio.com",
    projectId: "inapinch-1529857093090",
    storageBucket: "inapinch-1529857093090.appspot.com",
    messagingSenderId: "600057660668"
};
*/

firebase.initializeApp(config);
// Get a reference to the database service
// var database = firebase.database(); //added
const auth = firebase.auth();
const usersRef = firebase.database().ref("/users");

$(document).ready(function () {
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

    /////////////////////////////////////////////////////// 
    //Add login event
    ///////////////////////////////////////////////////////

    btnLogin.addEventListener('click', e => {
        // Get email and pass
        const email = userEmail.value;
        const pass = userPassword.value;

        console.log(email, pass);

        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise
            .then( user => {
                const promise2 = userRef.child(user.user.id).once('value');
                promise2
                    .then(snap => {
                        username = snap.val().userName;
                        console.log(`user ${username} logged in`);
                    })
                    .catch(err => {
                        console.log(`user name does not exist for ${emai}`);
                    });
            })
            .catch(function (error) {
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
    $('#createUser').click( function() {
        // Get username, email, and pass
        const username = txtUsername.value.trim(); //added, not working yet
        const email = txtEmail.value;
        const pass = txtPassword.value;
        // TAW  const auth = firebase.auth();

        console.log(username, email);
        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise
            .then( function(user) {
                // write additional child data to of the user
                console.log(`update() ${username}`)
                console.log(`update() ${user.user.uid}`)
                usersRef.child(user.user.uid).update({'userName': username});
            })
            .catch( function(e) {
              console.log(`error from createUserWithEmailAndPassword() ${e.message}`);
            }) ;
    });

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
        auth.signOut();
    });


    ///////////////////////////////////////////////////////
    // Add a realtime listener
    ///////////////////////////////////////////////////////

    auth.onAuthStateChanged(function (user) {
        console.log(user);
        if (user) {
            // User is signed in.
            document.getElementById("user_div").style.display = "block";
            document.getElementById("main_div").style.display = "none";

            // TAW - the user is already known
            /// var user = firebase.auth().currentUser;

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