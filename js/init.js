var mysql = require('mysql');
const Fs = require('fs');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'minh',
  password : 'root42',
  database : 'toll'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

const data = JSON.parse(Fs.readFileSync('./data.geojson'));

data.features.forEach(e => {
    if (e.geometry.type === 'Point')
        connection.query('INSERT INTO `toll` (`id_toll`, `name`, `latitude`, `longitude`) VALUES ("' + e.properties['@id'] + '","' + e.properties['name'] + '",' + e.geometry['coordinates'][0] + ',' + e.geometry['coordinates'][1] + ')');
    else if (e.geometry.type === 'LineString')  
        connection.query('INSERT INTO `toll` (`id_toll`, `name`, `latitude`, `longitude`) VALUES ("' + e.properties['@id'] + '","' + e.properties['name'] + '",' + e.geometry['coordinates'][0][0] + ',' + e.geometry['coordinates'][0][1] + ')');
    else if (e.geometry.type === 'Polygon') 
        connection.query('INSERT INTO `toll` (`id_toll`, `name`, `latitude`, `longitude`) VALUES ("' + e.properties['@id'] + '","' + e.properties['name'] + '",' + e.geometry['coordinates'][0][0][0] + ',' + e.geometry['coordinates'][0][0][1] + ')');
});

