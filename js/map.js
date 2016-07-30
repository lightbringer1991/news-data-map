$(document).ready(function() {

    /*
     *
     * Initialize map
     *
     */
    var map = L.map('map').setView([-37.560906, 143.828050], 5);

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

    firebaseApp = firebase.initializeApp(config);

    var newsItemsRef = firebase.database().ref().limitToLast(1000);

    newsItemsRef.on('child_added', function(snapshot) {

        var newsItem = snapshot.val();
        addMarker(newsItem);

    });

    function addMarker(newsItem) {

        var lat = newsItem.Latitude;
        var lng = newsItem.Longitude;
        var image = newsItem["Primary image"];

        if(lat != undefined && lng != undefined && image != "") {
            L.marker([lat, lng]).addTo(map)
                .bindPopup( '<a href="' + newsItem.URL + '" target="_blank"><strong>' + newsItem.Title + '</strong></a>' +
                            '<br><img src="' + image + '">'

            ).openPopup();
        }

    }


});
