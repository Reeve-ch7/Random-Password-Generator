const empty = "";
const uCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "!@#$%^&*=-_";

const pLength = document.getElementById("p-length");
const upperCase = document.getElementById("p-uppercase");
const lowerCase = document.getElementById("p-lowercase");
const pNumber = document.getElementById("p-number");
const pSymbol = document.getElementById("p-symbol");
const submit = document.getElementById("submit");
const password = document.getElementById("password");

submit.addEventListener("click", () => {
    let initialPassword = empty;
    (upperCase.checked) ? initialPassword += uCase : "";
    (lowerCase.checked) ? initialPassword += lCase : "";
    (pNumber.checked) ? initialPassword += number : "";
    (pSymbol.checked) ? initialPassword += symbol : "";

    password.value = generatePassword(pLength.value, initialPassword)
    // database

    db.collection('passwords')
    .add({
      password: password.value,
    })
    .then((docRef) => {
      console.log('Password Stored');
    })
    .catch((error) => {
      console.error('Error adding Password: ', error);
    });
});

function generatePassword(l, initialPassword) {
    let pass = "";
    for (let i = 0; i < l; i++) {
        pass += initialPassword.charAt(Math.floor(Math.random() * initialPassword.length));
    }
    return pass;
}

// Copy password to clipboard

const copy = document.getElementById("copy");

copy.addEventListener("click", () => {
    if (password.value == "") {
        alert("Please generate a password")
    }else {
        password.select();
        document.execCommand("copy");
        alert("Password has been copied to clipboard");
    }
});

// Database connection

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAJ1DJBtuQ983wEv9pyOC0M_RJiE9WRvTA",
    authDomain: "password-generator-d8b52.firebaseapp.com",
    projectId: "password-generator-d8b52",
    storageBucket: "password-generator-d8b52.appspot.com",
    messagingSenderId: "379761015812",
    appId: "1:379761015812:web:7f61c21028adf640c74951",
    measurementId: "G-SPSX5EEVWE"
  });
  const db = firebaseApp.firestore();
//   db.collection('passwords')
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         // console.log(`${doc.id} => ${doc.data()}`);
//         console.log(doc.data());
//       });
//     });