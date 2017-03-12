var L = require('leaflet');
var $ = require('jquery');

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

   var baseLayer = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   var topoLayer = new L.TopoJSON();

   $.getJSON('../resources/sthlm_topo.json')
      .done(addTopoData);

   var addTopoData = function(topoData){
      topoLayer.addData(topoData);
      topoLayer.addTo(map);
   }

})();
