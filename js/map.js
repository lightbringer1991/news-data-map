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

    /*
     *
     * Initialize Firebase
     *
     */
    var config = {
        apiKey: "AIzaSyD1Dcv20dh6k26Lpvt8cl2llfRQ3nh2Ib4",
        authDomain: "news-9219d.firebaseapp.com",
        databaseURL: "https://news-9219d.firebaseio.com",
        storageBucket: "news-9219d.appspot.com",
    };

    firebaseApp = firebase.initializeApp(config);
    var newsItemsRef = firebase.database().ref().limitToLast(250);

    /*
     *
     * Show News Items On Map
     *
     */
    newsItemsRef.on('child_added', function(snapshot) {
        var newsItem = snapshot.val();
        addMarker(newsItem);
    });

    function addMarker(newsItem) {

        var lat = newsItem.Latitude;
        var lng = newsItem.Longitude;
        var image = newsItem["Primary image"];

        if(lat != undefined && lng != undefined) {
            L.marker([lat, lng]).addTo(map)
                .bindPopup( '<p>Story Title: <a href="' + newsItem.URL + '" target="_blank"><strong>' + newsItem.Title + '</strong></a></p>' +
                            '<p>Date: ' + newsItem.Date + '</p>' +
                            '<p>Place: ' + newsItem.Place + '</p>' +
                            '<p>Station: ' + newsItem.Station + '</p>' +
                            '<img class="img-responsive" src="' + image + '">'

            ).openPopup();
        }
    }
});
