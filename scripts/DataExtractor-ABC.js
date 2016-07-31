/**
 * parsing ABC data to Firebase
 * output data format: {
 * 		'link': <link>,
 * 		'timestamp': <UNIX timestamp>,
 * 		'latitude' => <lattiude>,
 * 		'longitude' => <longitude>,
 * 		'thumbnail' => <thumbnail url>
 * }
 * @author Tuan Nguyen (tuanmnguyen91@gmail.com)
 * @created 2016-07-30
 * @updated 2016-07-31
 */

var url = 'https://data.gov.au/dataset/3fd356c6-0ad4-453e-82e9-03af582024c3/resource/3182591a-085a-465b-b8e5-6bfd934137f1/download/Localphotostories2009-2014-JSON.json';

var request = require('request');

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
var dbRoot = firebase.database();

function cleanString(str) {
	return str.replace(/[\.\$#\[\]]/g, '');
}

/**
 * convert date string "dd/mm/yyyy" to timestamp
 */
function parseDate(strDate) {
	var tokens = strDate.split('/');
	var date = new Date(Date.UTC(tokens[2], tokens[1], tokens[0]));
	return date.getTime();
}

request.get(url, function(error, response, body) {
	var data = JSON.parse(body);
	for (var i in data) {
		var category = '';
		if (data[i]['Keywords'].indexOf('accident') !== -1) {
			category = 'accidents';
		} else if (data[i]['Keywords'].indexOf('disaster') !== -1) {
			category = 'disasters';
		} else if (data[i]['Keywords'].indexOf('event') !== -1) {
			category = 'events';
		} else if (data[i]['Keywords'].indexOf('science') !== -1) {
			category = 'sciences';
		} else if (data[i]['Keywords'].indexOf('mysterious') !== -1) {
			category = 'mysteries';
		} else {
			category = 'generic_articles';
		}

		var outputData = {
			'title': data[i]['Title'],
			'link': data[i]["URL"],
			'timestamp': parseDate(data[i]["Date"]),
			'latitude': data[i]["Latitude"],
			'longitude': data[i]["Longitude"],
			'thumbnail': data[i]["Primary image"]
		};
		dbRoot.ref(category + '/' + cleanString(data[i]['Title'])).set(outputData);
	}
	// process.exit();
});