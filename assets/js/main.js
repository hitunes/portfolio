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
  },
  visualController: function() {
    var container = document.getElementsByClassName("banner__details")[0];
    var camera, scene, renderer, effect;
    var mesh, lightMesh, geometry;
    var spheres = [];
    var directionalLight, pointLight;
    var mouseX = 0;
    var mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    document.addEventListener("mousemove", onDocumentMouseMove, false);

    init();
    animate();

    function init() {
      camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.01,
        100
      );
      camera.position.z = 3;
      camera.focalLength = 3;

      var path = "assets/images/";
      var format = ".png";
      var urls = [
        path + "px" + format,
        path + "nx" + format,
        path + "py" + format,
        path + "ny" + format,
        path + "pz" + format,
        path + "nz" + format
      ];

      var textureCube = new THREE.CubeTextureLoader().load(urls);

      scene = new THREE.Scene();
      scene.background = textureCube;

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      var width = container.innerWidth || 2;
      var height = container.innerHeight || 2;

      effect = new THREE.AnaglyphEffect(renderer);
      effect.setSize(width, height);

      window.addEventListener("resize", onWindowResize, false);
    }

    function onWindowResize() {
      (windowHalfX = window.innerWidth / 2),
        (windowHalfY = window.innerHeight / 2),
        (camera.aspect = window.innerWidth / window.innerHeight);
      camera.updateProjectionMatrix();

      effect.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    }

    //

    function animate() {
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      var timer = 0.0001 * Date.now();

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;

      camera.lookAt(scene.position);

      for (var i = 0, il = spheres.length; i < il; i++) {
        var sphere = spheres[i];

        sphere.position.x = 5 * Math.cos(timer + i);
        sphere.position.y = 5 * Math.sin(timer + i * 1.1);
      }

      effect.render(scene, camera);
    }
  },
  toggleCollapse: function(e) {
    e.preventDefault();
    var collapse = document.getElementById("is-collapse-column");
    if (!collapse) {
      return;
    }
    if (e.target.innerHTML === "See All") {
      e.target.innerHTML = "Hide Some!";
    } else {
      e.target.innerHTML = "See All";
    }
    collapse.classList.toggle("is-collapse-column");
  }
};
