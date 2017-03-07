var SunCalc = require('suncalc');

var date = new Date();

var sthlmLat = 59.334591;
var sthlmLong = 18.063240;

/*
   Get todays sunlight times for Stockholm, Sweden
*/
var sunlightTimes = SunCalc.getTimes(date, sthlmLat, sthlmLong);
console.log(sunlightTimes);

/*
   Get sun position from times for Stockholm, Sweden
*/
var sunPosition = SunCalc.getPosition(sunlightTimes.solarNoon, sthlmLat, sthlmLong);
console.log(sunPosition);

/*
   Calculate sun position in degrees for Stockholm, Sweden
*/
var sunAzimuthDegrees = sunPosition.azimuth * (180 / Math.PI);
var sunAltitudeDegrees = sunPosition.altitude * (180 / Math.PI);

var sun_x = -Math.sin(sunPosition.azimuth) * Math.cos(sunPosition.azimuth);
var sun_y = -Math.cos(sunPosition.azimuth) * Math.cos(sunPosition.azimuth);
var sun_z = Math.sin(sunPosition.azimuth);

var sunPos = {sun_x, sun_y, sun_z};

// console.log(sunPos);
console.log('degrees:', sunAzimuthDegrees);
console.log('altitude:', sunAltitudeDegrees);


var objHeight = 28;

var shadowLength = objHeight / Math.tan(sunPosition.altitude);

var height = shadowLength * Math.tan(sunPosition.altitude);

var tan = height / shadowLength;

var computedTan = Math.tan(sunPosition.altitude);

console.log('computed tan:', computedTan);
console.log('tan:', tan);

console.log(shadowLength);
console.log(height);
