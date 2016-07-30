/**
 * parsing News Corp data to Firebase
 * output data format: {
 * 		'link': <link>,
 * 		'timestamp': <UNIX timestamp>,
 * 		'latitude' => <lattiude>,
 * 		'longitude' => <longitude>,
 * 		'thumbnail' => <thumbnail url>
 * }
 */

var baseURL = 'http://cdn.newsapi.com.au/content/v2/?api_key=dvae65bt88b6n8gpttv4ervt&pageSize=100&query=contentType:news_story AND ';

var url_accident = baseURL + 'keywords:accident';
var url_disaster = baseURL + 'keywords:disaster';
var url_event = baseURL + 'keywords:accident';
var url_science = baseURL + 'keywords:science';
var url_mystery = baseURL + 'keywords:mysterious';

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

function processData(requestObj, url, category) {
	requestObj.get(url, function(error, response, body) {
		var jsonData = JSON.parse(body);
		for (var i in jsonData.results) {
			var result = jsonData.results[i];
			var title = cleanString(result.title);
			if (result.locationGeoPoints.length > 0) {
				// get thumbnail image
				var thumbnailUrl = '';
				if (result.hasOwnProperty('thumbnailImage')) {
					thumbnailUrl = result.thumbnailImage.id.link;
				}

				var outputData = {
					'title': result.title,
					'link': result.link,
					'timestamp': Date.parse(result.dateUpdated),
					'latitude': result.locationGeoPoints[0].latitude,
					'longitude': result.locationGeoPoints[0].longitude,
					'thumbnail': thumbnailUrl
				};
				dbRoot.ref(category + '/' + title).set(outputData);
			}
		}
	});	
}

processData(request, url_accident, 'accidents');
processData(request, url_disaster, 'disasters');
processData(request, url_event, 'events');
processData(request, url_science, 'sciences');
processData(request, url_mystery, 'mysteries');
