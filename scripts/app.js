var L = require('leaflet');
var $ = require('jquery');
var omni = require('leaflet-omnivore');

L.Icon.Default.imagePath = '../node_modules/leaflet/dist/images/';

L.TopoJSON = L.GeoJSON.extend({
  addData: function(jsonData) {
      if (jsonData.type === "Topology") {
         for (key in jsonData.objects) {
            geojson = topojson.feature(jsonData, jsonData.objects[key]);
            L.GeoJSON.prototype.addData.call(this, geojson);
         }
      }
      else {
         L.GeoJSON.prototype.addData.call(this, jsonData);
      }
   }
});



var init = (function() {
   var mapCenter = [59.3308, 18.0673];
   var startZoom = 12;

   var map = new L.Map('map').setView(mapCenter, startZoom);

   var baseTileLayer = new L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
   	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
   	subdomains: 'abcd',
   	ext: 'png'
   }).addTo(map);

   var summerTileLayer = new L.tileLayer('http://localhost:3000/{z}/{x}/{y}.{ext}', {
      minZoom: 11,
      maxZoom: 15,
      ext: 'png',
      tms: true,
   }).addTo(map);

   var buildings = 
   // var buildings = omni.csv('http://localhost:3000/buildings');
   // buildings.addTo(map);
   // var buildings = omni.topojson('http://localhost:3000/buildings');
   // buildings.addTo(map);

   // var topoLayer = new L.TopoJSON();
   //
   // $.getJSON('../resources/sthlm_topo.json')
   //    .done(addTopoData);
   //
   // var addTopoData = function(topoData){
   //    topoLayer.addData(topoData);
   //    topoLayer.addTo(map);
   // }

})();
