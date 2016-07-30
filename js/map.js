$(document).ready(function() {

    /*
     *
     * Initialize map
     *
     */
    var map = L.map('map').setView([-37.560906, 143.828050], 9);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Initialize Firebase
    var config = {
                    apiKey: "AIzaSyDhv0JZOeI6qpcb5ecuxybtFep5i68id3k",
                    authDomain: "newsdatamashup.firebaseapp.com",
                    databaseURL: "https://newsdatamashup.firebaseio.com",
                    storageBucket: "newsdatamashup.appspot.com",
                };

    var firebaseApp = firebase.initializeApp(config);

    var newsItems = firebase.database().ref('newsdatamashup');

    newsItems.on('child_added', function(data) {
        var data = data.val() || 'Anonymous';
        console.log(data);
    });

    newsItems.once('value').then(function(snapshot) {
      var keywords = snapshot.val();
      console.log(keywords);
    });

});
