<<<<<<< HEAD
// Initialize Firebase (config & env didn't work, will switch keys once app is working)
// var apiKey = config.apiKey;
// var authDomain = config.authDomain;
// var databaseURL = config.databaseURL;
// var projectId = config.projectId;
// var storageBucket = config.storageBucket;
// var messagingSenderId = config.messagingSenderId;

/* Candace's
=======
//Candace's
>>>>>>> refs/remotes/origin/master
var config = {
    apiKey: "AIzaSyA2_tnNsCgwOh6gNQIhuBPu5dzrtdctTEU",
    authDomain: "in-a-pinch-project-2.firebaseapp.com",
    databaseURL: "https://in-a-pinch-project-2.firebaseio.com",
    projectId: "in-a-pinch-project-2",
    storageBucket: "in-a-pinch-project-2.appspot.com",
    messagingSenderId: "674290992138"
};
<<<<<<< HEAD
*/
/* Todd's
*/
var config = {
    apiKey: "AIzaSyDUWLn9TlTiPbRUKh0lypHoKXeSQSG_FUs",
    authDomain: "inapinch-1529857093090.firebaseapp.com",
    databaseURL: "https://inapinch-1529857093090.firebaseio.com",
    projectId: "inapinch-1529857093090",
    storageBucket: "inapinch-1529857093090.appspot.com",
    messagingSenderId: "600057660668"
};

firebase.initializeApp(config);
// Get a reference to the database service
// var database = firebase.database(); //added
const auth = firebase.auth();
const usersRef = firebase.database().ref("/users");
///////////////////////////////////////////////////////
// How Firebase Database is Set Up
///////////////////////////////////////////////////////
// /users
//     /userId1
//        userEmail: "123email@gmail.com"
//        userName: "Shally"
=======

firebase.initializeApp(config);
// Get a reference to the database service
const auth = firebase.auth();
// const usersRef = firebase.database().ref("/users");
>>>>>>> refs/remotes/origin/master

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

<<<<<<< HEAD
    btnLogin.addEventListener('click', e => {
        // Get email and pass
        const email = userEmail.value;
        const pass = userPassword.value;

        console.log(email, pass);

        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise
            .then( user => {
                /*
                    */
            })
            .catch(function (error) {
                // Handle error
                var errorCode = error.code;
                var errorMessage = error.message;

                $("#exampleModal").modal();
                // alert("You look a little flushed! The email you entered is not correct. Try again!");
                console.log(errorMessage);
                alert(errorMessage);
            });
    });
=======
btnLogin.addEventListener('click', e => {
    e.preventDefault();
    // Get email and pass
    const email = userEmail.value;
    const pass = userPassword.value;

    console.log(email, pass);

    // Sign in
    auth.signInWithEmailAndPassword(email, pass)
        // .then( user => {
        //     console.log("I made it this far!");
        //     document.getElementById("user_para").innerHTML = "Welcome User: " + user.displayName;
        // })
        // .catch(function (error) {
        //     // Handle error
        //     var errorCode = error.code;
        //     var errorMessage = error.message;

        //     $("#exampleModal").modal();
        //     // alert("You look a little flushed! The email you entered is not correct. Try again!");
        //     console.log(errorMessage);
        //     alert(errorMessage);
        // });
});
>>>>>>> refs/remotes/origin/master

///////////////////////////////////////////////////////
// Add login to signup event
///////////////////////////////////////////////////////
<<<<<<< HEAD
    // sign-up.addEventListener('click', e => {
    //     $('.log-section').addClass('hide');
    //     $('#signupDiv').fadeIn('slow').removeClass('hide');
    // });


=======
>>>>>>> refs/remotes/origin/master
    $('#sign-up').click(function () {
        $('.log-section').hide();
        $('#signupDiv').show("slow");
    });


///////////////////////////////////////////////////////
// Add signup event
///////////////////////////////////////////////////////
    $('#createUser').click( function() {
        // Get username, email, and pass
<<<<<<< HEAD
        const username = txtUsername.value.trim(); //added, not working yet
        const email = txtEmail.value;
        const pass = txtPassword.value;
        // store this locally
        localStorage.setItem('user', JSON.stringify(username));
        // TAW  const auth = firebase.auth();

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

=======
        const displayName = txtUsername.value.trim(); //added, not working yet
        const email = txtEmail.value;
        const pass = txtPassword.value;


        // Sign up
        auth.createUserWithEmailAndPassword(email, pass)
            .then(function(userCredential) {
                userCredential.user.updateProfile({
                    displayName: displayName
                }).then( function() {
                    console.log(userCredential);
                    //if redirecting to /map the line below can be taken out
                document.getElementById("user_para").innerHTML = "Welcome User: " + userCredential.user.displayName;
                ('#signupDiv').modal('hide');  ///TODO: doesnt hide modal 
                })
            })
            .catch( function(e) {
              console.log(`error from createUserWithEmailAndPassword() ${e.message}`);
            });

    });

btnLogout.addEventListener('click', e => {
    auth.signOut();
});

>>>>>>> refs/remotes/origin/master

///////////////////////////////////////////////////////
// Add a realtime listener
///////////////////////////////////////////////////////

    auth.onAuthStateChanged(function (user) {
        console.log(user);
<<<<<<< HEAD
        //saves user to local storage
        var username = JSON.parse(localStorage.getItem('user'));

        if (user) {

            //still trying to connect firebase database
            // firebaseDataBase.ref('users/' + user.uid).set({
            //     username: username
            // });
            // var retrievedUserName = firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
            // var username = snapshot.val().username;

            // User is signed in.
            document.getElementById("user_div").style.display = "block";
            document.getElementById("main_div").style.display = "none";
            // document.getElementById("user_para").innerHTML = "Welcome User: " + username;
            

            // TAW - the user is already known

            //var user = firebase.auth().currentUser;

            var email_id = user.email;
            document.getElementById("user_para").innerHTML = "Welcome User: " + email_id;
            const promise = usersRef.child(user.uid).once('value');
            promise
                .then(snap => {
                    username = snap.val().userName;
                    console.log(`user ${username} logged in`);
                    window.location.href = "/map";
                })
                .catch(err => {
                    console.log(`user name does not exist for ${emai}`);
                });
=======

        if (user) {

            // User is signed in.
            document.getElementById("user_div").style.display = "block";
            document.getElementById("main_div").style.display = "none";
            document.getElementById("user_para").innerHTML = "Welcome User: " + user.displayName;
            window.location.assign('/map');
>>>>>>> refs/remotes/origin/master
        } 
        else {

            // No user is signed in.
            console.log("not logged in");
            document.getElementById("user_div").style.display = "none";
            document.getElementById("main_div").style.display = "block";
        }
    });
});