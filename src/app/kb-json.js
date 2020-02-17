const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyD-Mpe9jycmYIHyGVmGNIVpTGnQG7X0wCw",
    authDomain: "kitchen-brigade-matchstick.firebaseapp.com",
    projectId: "kitchen-brigade-matchstick"
  });
  
var db = firebase.firestore();

var packages =[  
    {
      "id": 1,
      "slug": "cooking-class",
      "image": "./assets/sample-images/travel/Travel1-64.47.png",
      "name": "Cooking Classes ",
      "shortDesc": "All cooking experiences with Kitchen Brigade chefs are vetted for quality, so you can learn authentic recipes and feed your appetite for culture.",
      "longDesc": "",
      "overview": "",
      "duration": "",
      "groupSize": "",
      "languages": "",
      "cuisine": ""
    },
    {
      "id": 2,
      "slug": "personal-chef",
      "image": "./assets/sample-images/travel/Travel2-64.47.png",
      "name": "Personal Chef",
      "shortDesc": "22 kilometers long avenue along the coast of Rio de la Plata stretching throughout all of Montevideo.",
      "longDesc": "",
      "overview": "",
      "duration": "5 hours",
      "groupSize": "",
      "languages": "",
      "cuisine": ""
    },
    {
      "id": 3,
      "slug": "party",
      "image": "./assets/sample-images/travel/Travel3-64.47.png",
      "name": "Party Platter",
      "shortDesc": "22 kilometers long avenue along the coast of Rio de la Plata stretching throughout all of Montevideo.",
      "longDesc": "",
      "overview": "",
      "duration": "",
      "groupSize": "",
      "languages": "",
      "cuisine": ""
    },
    {
      "id": 4,
      "slug": "barbeque",
      "image": "./assets/sample-images/travel/Travel4-64.47.png",
      "name": "Barbeque",
      "shortDesc": "22 kilometers long avenue along the coast of Rio de la Plata stretching throughout all of Montevideo.",
      "longDesc": "",
      "overview": "",
      "duration": "",
      "groupSize": "",
      "languages": "",
      "cuisine": ""
    },
    {
      "id": 5,
      "slug": "mixology",
      "image": "./assets/sample-images/travel/Travel5-64.47.png",
      "name": "Mixology",
      "shortDesc": "22 kilometers long avenue along the coast of Rio de la Plata stretching throughout all of Montevideo.",
      "longDesc": "",
      "overview": "",
      "duration": "",
      "groupSize": "",
      "languages": "",
      "cuisine": ""
    }
 ]

packages.forEach(function(obj) {
    db.collection("packages").add({
        id: obj.id,
        slug: obj.slug,
        name: obj.name,
        shortDesc: obj.shortDesc,
        longDesc: obj.longDesc,
        overview: obj.overview,
        duration: obj.duration,
        groupSize: obj.groupSize,
        languages: obj.languages,
        cuisine: obj.cuisine
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});