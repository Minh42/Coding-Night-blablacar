var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

routing = require('./js/routing.js');
//coord = require('./js/coord.js');

app.listen(port);

app.get('/:latA/:longA/:latB/:longB', (req, res) => {
    routing.getRouteFromCoordinates(req.params.latA, req.params.longA, req.params.latB, req.params.longB, function(response) {
//        coord.getTollPrice(response, function(data) {
//            res.send(data);
//        });
        res.send(response);
    });
})
/*
app.get('/price/:latA/:longA/:latB/:longB', (req, res) => {
    routing.getTollPrice(req.params.latA, req.params.longA, req.params.latB, req.params.longB, function(response) {

        res.send(response);
    });
})
*/

console.log('started on: ' + port);  