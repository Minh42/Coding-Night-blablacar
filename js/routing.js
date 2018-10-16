var googleKey = 'AIzaSyAIaLii9_yU7EBPar48TD6MOZPOZlz8dy4';
var googleMapsClient = require('@google/maps').createClient({key: googleKey});
var polyline = require('google-polyline');
const request = require('request');
const toll = require('toll.js');
var getRouteFromCoordinates = function(latA, longA, latB, longB, callback) {
    googleMapsClient.directions({
        origin: {lat:latA, lng:longA},
        destination: {lat:latB, lng:longB}
    }, function(err, response) {
        callback(polyline.decode(response.json.routes[0].overview_polyline.points));
    });
};

var getTollPrice = function(latA, longA, latB, longB, callback) {
   var res = toll.price(getRouteFromCoordinates(latA, longA, latB, longB));
    console.log("test" + res);
};

module.exports = {
  getRouteFromCoordinates: getRouteFromCoordinates
};