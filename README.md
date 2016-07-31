## Synopsis

* This project is about creating a projection of articles and events onto Australian map.
* Data is obtained from a few government datasets.

## Motivation

This project is a GovHack inspired project. Created to compete in [Govhack 2016](https://www.govhack.org/ "Govhack 2016")

Our Govhack project page: [News Data Mashup](https://2016.hackerspace.govhack.org/content/news-data-mashup)

## Installation
* Demo is live [here](https://peterplucinski.github.io/news-data-map/)
* If you want to run the project locally, please follow the steps:
	* ensure that nodejs and npm is installed in your target machine
	* clone our project
	* create a Firebase database
	* change database settings in scripts/DataExtractor-*.js files
	* run scripts/DataExtractor-*.js scripts to populate datae into your Firebase database (you may need to install extra nodejs dependencies)
	* change database settings in js/map.js
	* enjoy the visual data

## Used APIs:
* [Firebase API](https://firebase.google.com/)
* [ABC news API](https://developers.digital.abc.net.au/2016/07/28/the-abc-gateway-api-and-govhack/)
* [News Corp API](http://portal.govhack.org/datasets/2016/australia/newscorp/news-corp-content-api-%28capi%29-sa.html)

## Used libraries:
* [Leaflet](http://leafletjs.com/)
* [node.js](https://nodejs.org/en/) and other nodejs libraries
* [Bootstrap 3](http://getbootstrap.com/)
* [Favicon](http://www.favicon-generator.org/)

## Contributors
* Peter Plucinski (Developer)
* Tuan Nguyen (Developer)
* Christopher Bell (Developer)
* Darren Lanigan (Developer)


## License
    Copyright (c) 2016 Panic Mouse

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

