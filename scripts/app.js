var L = require('leaflet');

L.Icon.Default.imagePath = '../node_modules/leaflet/dist/images/';

var mapCenter = [59.3308, 18.0673];
var startZoom = 12;

var map = new L.Map('map').setView(mapCenter, startZoom);
var tiles = new L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	ext: 'png'
}).addTo(map);
