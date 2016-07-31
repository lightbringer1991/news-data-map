/**
 * add Intellectual property data into firebase
 * firebase output format: {<year>: {'australia': <integer>, 'non-australia': <integer>}, ....}
 */

var url_patent = 'http://data.gov.au/dataset/6a40d5a7-5886-4a96-8bca-9260ec4479ed/resource/29559ce8-5cf5-42b5-bbc5-fcf8e66e66cb/download/IPGOD101-03022016.csv';
var url_trademark = 'http://data.gov.au/dataset/6a40d5a7-5886-4a96-8bca-9260ec4479ed/resource/1977143a-5a0c-490a-859e-9a2d8f375d25/download/IPGOD201-04022016.csv';
var url_design = 'http://data.gov.au/dataset/6a40d5a7-5886-4a96-8bca-9260ec4479ed/resource/28936f58-d2ee-4b63-9253-cc20092f5958/download/IPGOD301-05022016.csv';
var url_plantBreeder = 'http://data.gov.au/dataset/6a40d5a7-5886-4a96-8bca-9260ec4479ed/resource/7ebfb09d-6fef-4146-a47b-c78d0eb70089/download/IPGOD401-05022016.csv';

var request = require('request');
var parse = require('csv-parse');

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

// read patent data
request.get(url_patent, function(error, response, body) {
	parse(body, {}, function(err, data) {
		var outputData = { };
		for (var i = 0; i < data.length; i++) {
			if ((data[i][3] == 'AU') && (data[i][6] == 'Granted' || data[i][6] == 'Sealed')) {
				if (!outputData.hasOwnProperty(data[i][2])) {
					outputData[data[i][2]] = {
						'australia': 1,
						'non-australia': 0
					};
				} else {
					outputData[data[i][2]]['australia']++;
				}
			} else if ((data[i][3] != 'AU') && (data[i][6] == 'Granted' || data[i][6] == 'Sealed')) {
				if (!outputData.hasOwnProperty(data[i][2])) {
					outputData[data[i][2]] = {
						'australia': 0,
						'non-australia': 1						
					};
				} else {
					outputData[data[i][2]]['non-australia']++;
				}
			}
		}
		dbRoot.ref('IP/patent').set(outputData);
	});
});
