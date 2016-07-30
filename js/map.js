$(document).ready(function() {

    /*
     *
     * Initialize map
     *
     */
    var map = L.map('map').setView([-37.560906, 143.828050], 5);
    var markerList = [];

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    /*
     *
     * Initialize Firebase
     *
     */
    var config = {
        apiKey: "AIzaSyDhv0JZOeI6qpcb5ecuxybtFep5i68id3k",
        authDomain: "newsdatamashup.firebaseapp.com",
        databaseURL: "https://newsdatamashup.firebaseio.com",
        storageBucket: ""
    };

    var config_dev = {
        apiKey: "AIzaSyA2Y_YYmR7ZRRsNC2dBodm2ffNTX14pMAo",
        authDomain: "newsmap-4c2a5.firebaseapp.com",
        databaseURL: "https://newsmap-4c2a5.firebaseio.com",
        storageBucket: "newsmap-4c2a5.appspot.com"
    };

    firebaseApp = firebase.initializeApp(config);

    $("input[name='filter']").on('change', change_processFilter);
    $("input[name='filter'][value='events']").trigger('change');

    // loadMap(dataRef, true);

    /**
     * load leaflet map with new data
     */
    function loadMap(mapObj, dataRef, icon) {
        dataRef.on('child_added', function(snapshot) {
            var item = snapshot.val();
            markerList.push(addMarker(mapObj, item, icon));
        });
    }

    /**
     * add a marker into map
     */
    function addMarker(mapObj, data, icon) {
        //{ icon: icon }
        var dateObj = new Date(data.timestamp);
        var dateString = dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear();
        return marker = L.marker([data.latitude, data.longitude], { icon: icon }).addTo(mapObj)
            .bindPopup( '<p>Story Title: <a href="' + data.link + '" target="_blank"><strong>' + data.title + '</strong></a></p>' +
                            '<p>Date: ' + dateString + '</p>' +
                            '<img class="img-responsive" src="' + data.thumbnail + '">'
            );
    }

    function removeMarkers(mapObj) {
        for (var i = 0; i < markerList.length; i++) {
            mapObj.removeLayer(markerList[i]);
        }
    }

    function change_processFilter(event) {
        removeMarkers(map);
        markerList = [];
        $("input[name='filter']:checked").each(function() {
            var dataRef = firebase.database().ref($(this).val()).limitToLast(100);
            var icon = L.icon({
                iconUrl: 'images/marker_' + $(this).val() + '.png',
                iconSize: [25, 41],
                iconAnchor: [22, 94],
                popupAnchor: [-3, -76],
                shadowSize: [68, 95],
                shadowAnchor: [22, 94]
            });
            loadMap(map, dataRef, icon);
        });
    }
});
