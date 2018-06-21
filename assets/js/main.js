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

var settings = { timestampsInSnapshots: true };
db.settings(settings);

var app = {
  submitToFirebase: function() {
    var _form = document.querySelector(".job__form");
    var _name1 = document.querySelector(".form__input-a");
    var _name2 = document.querySelector(".form__input-b");
    var _message = document.querySelector(".job__textarea");
    var _btn = document.querySelector(".button_base");
    var _hideBtn = document.querySelector(".hide-btn");
    var _success = document.querySelector(".success");
    var _line = document.querySelector(".line");

    _btn.addEventListener("click", function(e) {
      _hideBtn.click();
    });
    _form.addEventListener("submit", function(e) {
      e.preventDefault(); //stops page from reloading
      _line.style.display = "block";
      db.collection("users")
        .add({
          name: _name1.value,
          Email: _name2.value,
          message: _message.value
        })
        .then(function(docRef) {
          // console.log("Document written with ID: ", docRef.id);
          _success.style.display = "block";
          _line.style.display = "none";
          _form.reset();
          setTimeout(function() {
            _success.style.display = "none";
          }, 3000);
        })
        .catch(function(error) {
          alert(error);
          // console.error("Error adding document: ", error);
        });
    });
  },
  showResume: function() {
    console.log("cv on the screen");
    var initialised = false;
    var _togglers = Array.from(document.getElementsByClassName("toggler"));
    var _html = document.getElementsByTagName("html")[0];
    var $body = document.getElementsByTagName("body")[0];
    var msc = 0;
    if (!initialised) {
      _togglers.forEach(function(_toggler) {
        _toggler.addEventListener("click", function(e) {
          var bodyClick = document.createElement("Div");
          bodyClick.className = "body__overlay";
          if (msc === 0) {
            bodyClick.addEventListener("click", function(e) {
              _html.classList.toggle("cv-open");
              bodyClick.remove();
            });
            $body.appendChild(bodyClick);
            _html.classList.toggle("cv-open");
            msc = 1;
          } else {
            _html.classList.remove("cv-open");
            bodyClick.remove();
            msc = 0;
          }
        });
        initialised = true;
      });
      // _togglers.forEach(function (_toggler) {
      //   _toggler.addEventListener('click', function () {
      //     _html.classList.toggle('cv-open');
      //   });
      // });
    }
  }
  // loader: function() {
  //   var load = document.getElementById("doc-loader");
  //   console.log(load);
  // }
  //   apiController: function(){
  //    var output = '';
  //    var _grid = document.querySelector('.grid');
  //    //show loader
  //     fetch ('https://api.github.com/users/hitunes/repos').then(function(blob){
  //       return blob.json()
  //     }).then(function(responses){
  //       //hide loader
  //       // console.log(res);
  //       if (responses){
  //         responses.forEach(function(response){
  //           // console.log(responses.name);
  //           output += `	<div class="col-4 col-x-12">
  //           <div class="card">
  //             <div class="card__body">
  //               <div class="card__overlay">
  //                 <div class="card__overlay-details">
  //                   <div class="card__icons">&sect;</div>
  //                   <a href=${response.url} class="card__links" target="_blank">Visit Project</a>
  //                 </div>
  //               </div>
  //               <img src="assets/img/card.png" alt="placeholder">
  //             </div>
  //             <div class="card__footer">
  //               <h6>${response.name}</h6>
  //             </div>
  //           </div>
  //         </div>`;
  //       });
  //       }
  //     },
  //     function(err){
  //       if (err){
  //         output += "<h1> NO response from Github API </h1>"
  //       }
  //       console.log(err)
  //     });
  //     _grid.innerHTML = output;
  //   }
};
