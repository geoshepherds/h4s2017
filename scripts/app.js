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

(function() {

   var mapCenter = [59.3308, 18.0673];
   var startZoom = 13;
   var map;

   // Tile layers
   // var baseMapLayerUrl = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}',
   //    baseMapLayerOptions = {
   //       attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
   //       subdomains: 'abcd',
   //       ext: 'png'
   //    };

   var baseMapLayerUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      baseMapLayerOptions = {
   	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
   	subdomains: 'abcd',
   	maxZoom: 19
   };

   var summerTileLayer,
      summerTileLayerUrl = 'http://localhost:3000/summer/{z}/{x}/{y}.{ext}',
      summerTileLayerOptions = {
         minZoom: 11,
         maxZoom: 15,
         ext: 'png',
         tms: true,
      };

   var winterTileLayer,
      winterTileLayerUrl = 'http://localhost:3000/winter/{z}/{x}/{y}.{ext}',
      winterTileLayerOptions = {
         minZoom: 11,
         maxZoom: 15,
         ext: 'png',
         tms: true,
      };

   function init() {

      // create map with settings
      map = new L.Map('map').setView(mapCenter, startZoom);

      // loade Tile layers
      var baseMapLayer = new L.tileLayer(baseMapLayerUrl, baseMapLayerOptions)
         .setZIndex(100)
         .addTo(map);

      summerTileLayer = new L.tileLayer(summerTileLayerUrl, summerTileLayerOptions).setZIndex(200);
      winterTileLayer = new L.tileLayer(winterTileLayerUrl, winterTileLayerOptions).setZIndex(300).addTo(map);

      $('.button').on('click', function() {
         changeTileLayer($(this).attr('id'));
         $('.button').toggleClass('active', false);
         $(this).toggleClass('active', true);
      });
   }

   function changeTileLayer(season) {
      var activeLayer = $('#topBanner').find('.button.active').attr('id');

      if (season === activeLayer) {
         return;
      } else {
         if (season === 'summer') {
            map.removeLayer(winterTileLayer);
            map.addLayer(summerTileLayer);
         } else if (season === 'winter') {
            map.removeLayer(summerTileLayer);
            map.addLayer(winterTileLayer);
         }
      }
   }

   init();

})();
