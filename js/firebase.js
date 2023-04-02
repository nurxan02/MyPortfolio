"use stric";
const firebaseConfig = {
  apiKey: "AIzaSyAToaXDizW5GJ3gKNywuQ1K44fvK7STKlU",
  authDomain: "portfolio-d6469.firebaseapp.com",
  databaseURL: "https://portfolio-d6469-default-rtdb.firebaseio.com",
  projectId: "portfolio-d6469",
  storageBucket: "portfolio-d6469.appspot.com",
  messagingSenderId: "641406999080",
  appId: "1:641406999080:web:86eb559e9ee26f6528331d",
};

firebase.initializeApp(firebaseConfig);

var portfolioDB = firebase.database().ref("portfolio");

document.getElementById("portfolioMain").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  var name = document.querySelector("#nameForm").value;
  var surname = document.querySelector("#surnameForm").value;
  var email = document.querySelector("#emailForm").value;
  var message = document.querySelector("#messageForm").value;

  //   console.log(name, surname, email, message);
  saveMessages(name, surname, email, message);

  //   enable alert
  document.querySelector(".alert").style.visibility = "visible";
  document.querySelector(".alert").style.opacity = "90%";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.opacity = "0%";
    document.querySelector(".alert").style.visibility = "hidden";
  }, 3000);
  document.getElementById("portfolioMain").reset();
}

const saveMessages = (name, surname, email, message) => {
  var newContactForm = portfolioDB.push();

  newContactForm.set({
    name: name,
    surname: surname,
    message: message,
    email: email,
  });
};
