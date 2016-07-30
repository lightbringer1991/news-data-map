$(document).ready(function() {

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

    var itemsRef = firebaseApp.database().ref();

    var items = [];
    itemsRef.on('value', (snap) => {

        // get children as an array

        snap.forEach((child) => {
            items.push({
            title: child.val().title,
            _key: child.key
            });
        });

        /*
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items)
        });
        */
    });

    console.log(items);


    // itemsRef = firebaseApp.database().ref();

    // console.log(firebase.database().limitToLast(100));

     /*
    firebase.database().ref('newsdatamashup/775').once('value').then(function(snapshot) {
      var keywords = snapshot.val().keywords;
      console.log(snapshot.val());
    });
    */

});
