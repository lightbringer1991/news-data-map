// firebase initialization
var firebase = require('firebase');

firebase.initializeApp({
	apiKey: "AIzaSyDhv0JZOeI6qpcb5ecuxybtFep5i68id3k",
	authDomain: "newsdatamashup.firebaseapp.com",
	databaseURL: "https://newsdatamashup.firebaseio.com",
	storageBucket: "",
	// apiKey: "AIzaSyA2Y_YYmR7ZRRsNC2dBodm2ffNTX14pMAo",
	// authDomain: "newsmap-4c2a5.firebaseapp.com",
	// databaseURL: "https://newsmap-4c2a5.firebaseio.com",
	// storageBucket: "newsmap-4c2a5.appspot.com"
});

firebase.database().ref('accidents').remove();
firebase.database().ref('disasters').remove();
firebase.database().ref('events').remove();
firebase.database().ref('generic_articles').remove();

