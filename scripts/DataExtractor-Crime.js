/**
 * add Intellectual property data into firebase
 * firebase output format: {<year>: {'australia': <integer>, 'non-australia': <integer>}, ....}
 * @author Tuan Nguyen (tuanmnguyen91@gmail.com)
 * @created 2016-07-31
 * @updated 2016-07-31
 */


var url = 'http://data.gov.au/storage/f/2013-09-12T23%3A32%3A36.918Z/rci-offencebymonth.csv';

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

// read crime data
request.get(url, function(error, response, body) {
	parse(body, {}, function(err, data) {
		var header = {};
		var size = 0;
		// read data header
		for (var i = 4; i < data[0].length; i++) {
			var date = new Date(data[0][i]);
			header[i] = date.getFullYear() + '-' + (date.getMonth() + 1);
			size++;
		}

		// read output
		var output = {};
		for (var i = 4; i < size; i++) {
			output[i] = 0;
		}
		for (var i = 1; i < data.length; i++) {
			for (var j = 4; j < data[i].length; j++) {
				if (data[i][j] == '') {
					break;
				}
				if (!isNaN(data[i][j])) {
					output[j] += parseInt(data[i][j]);
				}
			}
		}

		// combine header and output
		outputData = {};
		for (var i = 4; i < size; i++) {
			outputData[header[i]] = output[i];
		}

		// push to firebase
		dbRoot.ref('crime/summary').set(outputData);
	});
});