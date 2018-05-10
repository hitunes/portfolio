 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyCfEZbWOVV1ppTZtkl24EEqhKbKAIGfFRo",
  authDomain: "portfolio-57fa7.firebaseapp.com",
  databaseURL: "https://portfolio-57fa7.firebaseio.com",
  projectId: "portfolio-57fa7",
  storageBucket: "portfolio-57fa7.appspot.com",
  messagingSenderId: "1604898812"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

var settings = {timestampsInSnapshots: true};
db.settings(settings);

var app = {
  submitToFirebase: function () {
    
  
   var _form = document.querySelector('.job__form');
    var _name = document.querySelector('.form__input');
    var _message = document.querySelector('.job__textarea');
    var _btn = document.querySelector('.button_base');
    var _hideBtn = document.querySelector('.hide-btn');
    var _success = document.querySelector('.success');
    var _loader = document.querySelector('.loader');

    _btn.addEventListener('click', function (e){
      _hideBtn.click();
    });
    _form.addEventListener('submit', function (e) {
        e.preventDefault(); //stops page from reloading
        _loader.style.display = "flex"
        db.collection("users").add({
          name: _name.value,
          message: _message.value
      })
      .then(function(docRef) {
          // console.log("Document written with ID: ", docRef.id);
          _success.style.display = "block";
          _loader.style.display = "none";
          _form.reset();
          setTimeout(function(){
            _success.style.display = "none";
          }, 3000);
      })
      .catch(function(error) {
        alert(error);
          // console.error("Error adding document: ", error);
      });
      });
  },
  showResume: function () {
    console.log("cv on the screen");
    var _togglers = Array.from(document.getElementsByClassName('toggler'));
    var _html = document.getElementsByTagName('html')[0];
    _togglers.forEach(function (_toggler) {
      _toggler.addEventListener('click', function () {
        _html.classList.toggle('cv-open');
      });
    });
  }
}