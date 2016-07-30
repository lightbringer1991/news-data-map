/**
 * parsing Geater Geelong news data to Firebase
 * output data format: {
 *		'title': <title>,
 * 		'link': <link>,
 * 		'timestamp': <UNIX timestamp>,
 * 		'latitude' => <lattiude>
 * 		'longitude' => <longitude>
 * }
 */

var request = require('request');
var xml2js = require('xml2js');
var util = require('util');
var parser = new xml2js.Parser();

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

var url = 'http://www.geelongaustralia.com.au/rss/events-all.aspx';

request.get(url, function(error, response, body) {
	parser.parseString(body, function(err, result) {
		for (var i in result.rss.channel[0].item) {
			var item = result.rss.channel[0].item[i];
			if (!item.hasOwnProperty('lat')) {
				continue;
			}
			var title = item.title[0].replace(/\./g, '');
			var outputData = {
				'title': item.title[0],
				'link': item.link[0],
				'timestamp': item.hasOwnProperty('dtstart') ? Date.parse(item.dtstart) : Date.parse(item.pubDate),
				'latitude': item.lat[0],
				'longitude': item.lng[0]
			};
			dbRoot.ref('events/' + title).set(outputData);
		}
	});
});