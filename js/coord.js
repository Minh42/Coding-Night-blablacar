var request = require('request');
var COORD_API_KEY = 'Lo67aFlQDfs2ZTa2D4FyCyN-uTSUZE-q1GEfP0ZiNMI';

var getTollPrice = function(route, callback) {
    var requestBody = {
      steps: [{polyline: route.map(p => ({lat: p[0], lng: p[1]}))}],
      vehicle: {
      axles: 2
        }
    };

//    console.log(requestBody.steps[0]);

    var responsePromise = request({
      uri:'https://api.coord.co/v1/search/tolling/route?access_key=' + COORD_API_KEY,
      method: 'POST',
      json: requestBody
    }, function (error, response, body) {
        callback(body)
    });
};

module.exports = {
  getTollPrice: getTollPrice
};
