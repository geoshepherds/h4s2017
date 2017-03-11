var L = require('leaflet');

L.Icon.Default.imagePath = '../node_modules/leaflet/dist/images/';

var mapCenter = [59.3308, 18.0673];
var startZoom = 10;

var map = new L.Map('map').setView(mapCenter, startZoom);

var tiles = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
