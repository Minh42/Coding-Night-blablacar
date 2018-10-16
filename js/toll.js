var mysql = require('mysql');
var sleep = require('sleep-async')().Promise;
const request = require('request');
const turf = require('@turf/turf');
const pointToLineDistance = require('@turf/point-to-line-distance');

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

var d = [[48.88353,2.38497],[48.88885,2.39604],[48.88132,2.40272],[48.87134,2.41303],[48.85584,2.41386],[48.84361,2.41376],[48.83667,2.41235],[48.8305,2.40236],[48.82659,2.39087],[48.81745,2.41429],[48.81649,2.45026],[48.82225,2.46273],[48.82851,2.47664],[48.82993,2.49644],[48.82649,2.51615],[48.83042,2.52994],[48.8361,2.54101],[48.83586,2.55981],[48.83249,2.59739],[48.82995,2.62554],[48.8319,2.64994],[48.82886,2.72297],[48.83219,2.77965],[48.84023,2.82087],[48.85929,2.84337],[48.87161,2.86253],[48.87887,2.88298],[48.89388,2.90798],[48.90789,2.94342],[48.91735,2.98481],[48.9252,3.01166],[48.93611,3.02864],[48.9559,3.04822],[48.96345,3.05388],[48.97611,3.07066],[48.98616,3.08815],[48.99709,3.11612],[49.01528,3.1551],[49.03203,3.17581],[49.03913,3.19655],[49.04028,3.2177],[49.0415,3.24811],[49.04673,3.27666],[49.05241,3.31477],[49.06577,3.33585],[49.07602,3.35696],[49.07765,3.38102],[49.08291,3.40835],[49.09685,3.44053],[49.10936,3.47987],[49.12097,3.51759],[49.12779,3.54873],[49.12888,3.59032],[49.14511,3.63716],[49.14928,3.67415],[49.15215,3.70352],[49.15739,3.72052],[49.17332,3.74443],[49.19873,3.76034],[49.20637,3.77234],[49.21923,3.81081],[49.23245,3.84195],[49.24139,3.88396],[49.24297,3.91585],[49.24788,3.94879],[49.24388,3.96356],[49.23767,3.96913],[49.22565,3.97133],[49.21407,3.99187],[49.20536,4.0151],[49.20487,4.02668],[49.20994,4.04269],[49.20883,4.06712],[49.202,4.09941],[49.18734,4.14356],[49.16279,4.19026],[49.12917,4.22771],[49.1209,4.24292],[49.10611,4.25435],[49.08749,4.25977],[49.06783,4.27179],[49.05345,4.28977],[49.04662,4.30812],[49.03969,4.34294],[49.03411,4.36919],[49.03364,4.39794],[49.03526,4.43477],[49.02914,4.491],[49.02888,4.53181],[49.03534,4.57679],[49.0358,4.614],[49.04845,4.66592],[49.0664,4.73],[49.06937,4.76398],[49.0776,4.82457],[49.07289,4.87317],[49.07224,4.8988],[49.07667,4.92346],[49.08884,4.97495],[49.09235,4.98378],[49.09159,5.01095],[49.09858,5.02366],[49.09467,5.05256],[49.09694,5.07619],[49.09197,5.09549],[49.09106,5.14844],[49.08715,5.16436],[49.08899,5.17836],[49.09185,5.22675],[49.09068,5.24488],[49.09491,5.26666],[49.09816,5.29958],[49.11153,5.36721],[49.1178,5.38147],[49.11754,5.39834],[49.11118,5.40917],[49.10757,5.42724],[49.11748,5.45799],[49.12122,5.48315],[49.11906,5.51968],[49.11887,5.53819],[49.11586,5.55166],[49.11063,5.56523],[49.11299,5.5761],[49.12113,5.59024],[49.12562,5.60948],[49.12906,5.66202],[49.14402,5.70796],[49.15778,5.7381],[49.17376,5.76246],[49.18554,5.80615],[49.19524,5.8652],[49.19841,5.91177],[49.19974,5.93622],[49.20401,5.9485],[49.19761,5.98357],[49.18353,6.00802],[49.17947,6.04042],[49.18393,6.07397],[49.19255,6.09073],[49.20216,6.10813],[49.20626,6.13413],[49.19581,6.15383],[49.20117,6.17973],[49.19823,6.20561],[49.18516,6.23629],[49.17899,6.24779],[49.16374,6.25191],[49.15266,6.25178],[49.1417,6.24638],[49.13476,6.24783],[49.12848,6.25579],[49.12659,6.28352],[49.12782,6.30674],[49.13474,6.34115],[49.13657,6.37455],[49.13854,6.39873],[49.13878,6.41825],[49.14162,6.42827],[49.14025,6.44539],[49.14076,6.47851],[49.13237,6.51048],[49.13262,6.56737],[49.1372,6.60173],[49.13602,6.6238],[49.13466,6.6509],[49.13255,6.6803],[49.13591,6.70217],[49.13563,6.72354],[49.1362,6.743],[49.13801,6.76448],[49.13395,6.77984],[49.13732,6.79506],[49.13864,6.81481],[49.13282,6.82143],[49.12106,6.82908],[49.10714,6.85759],[49.10074,6.86696],[49.08888,6.87349],[49.08069,6.88107],[49.0765,6.89195],[49.07092,6.9099],[49.0651,6.93785],[49.06001,6.95234],[49.05602,6.97082],[49.04831,6.98575],[49.04397,7.00572],[49.04179,7.02203],[49.0435,7.03595],[49.03985,7.05487],[49.03,7.067],[49.01468,7.07123],[49.00118,7.06858],[48.98988,7.06198],[48.97679,7.06424],[48.94992,7.09611],[48.92864,7.11773],[48.8967,7.12547],[48.87396,7.11988],[48.85894,7.12053],[48.84569,7.12666],[48.83338,7.14294],[48.81859,7.15217],[48.80831,7.17063],[48.79609,7.2021],[48.79034,7.2172],[48.77662,7.23507],[48.77278,7.28272],[48.77142,7.3199],[48.77067,7.3349],[48.76057,7.35086],[48.76515,7.37273],[48.77286,7.38857],[48.77783,7.40811],[48.77367,7.4433],[48.76954,7.47747],[48.76812,7.57308],[48.77114,7.6261],[48.76313,7.65962],[48.7522,7.67983],[48.74124,7.68764],[48.72567,7.69156],[48.70662,7.70743],[48.69427,7.72416],[48.67506,7.73547],[48.65886,7.73715],[48.64835,7.73044],[48.64811,7.72408],[48.64324,7.72542],[48.63693,7.72726],[48.63505,7.7225],[48.63503,7.71559]];
var prix = 0;
connection.query('UPDATE prix SET pri=0 WHERE id_prix=1');
async function getPrice(data)
{
var values = data.map(function(element) { return element[0]; });
var max_lat = Math.max.apply(null, values);
var min_lat = Math.min.apply(null, values);

var values = data.map(function(element) { return element[1]; });
var max_long = Math.max.apply(null, values);
var min_long = Math.min.apply(null, values);



// requete SQL
connection.query('SELECT * from `toll_coordinate` WHERE `longitude` > ' + min_long + ' AND `longitude` < ' + max_long + ' AND `latitude` > ' + min_lat + ' AND `latitude` < ' + max_lat,
    function (err, result, fields) {
        const filter = result.filter(function(t) {
            var pt = turf.point([t.latitude, t.longitude]); // coord du péage
            var line = turf.lineString(data);
            var distance = turf.pointToLineDistance(pt, line, {units: 'kilometers'});
            return (Number(distance).toFixed(3) < 0.4);
        });
        filter.forEach (e => {          
                // e['distance'] = Number(distance).toFixed(12);
                var line = turf.lineString([data[0], [e.latitude, e.longitude]]);
                var length = turf.length(line, {units: 'kilometers'});
                e['distance'] = length;
              //  console.log(e);
        });
        filter.sort(function(a,b){return a.distance - b.distance});
        var i = -1;

//        console.log(filter);
        var tmp = [];
        filter.forEach (async (e) => {
            await connection.query('SELECT `prix` FROM `unary_toll` WHERE `id_toll`=' + e.id_toll,
            function (err, result, fields) {
                i++;  
              
                if (result.length == 1) {
                   // console.log(result);
                }
                else if (result.length < 1 && i < filter.length - 1) {
                    connection.query('SELECT `prix` FROM `binary_toll` WHERE `id_toll_entree`=' + e.id_toll + ' AND id_toll_sortie=' + filter[i + 1].id_toll,
                    function (err, result, fields) {
                        
                        
                        if (result.length == 0)
                        {
                            tmp.push(e.id_toll);
                        }
                        else
                        {
                            prix += parseFloat(result[0].prix);
                            connection.query('UPDATE prix SET pri=' + prix + 'WHERE id_prix=1');
                            console.log(result[0].prix);
                        }
                        var j = 0;
                        var x = 0;
                        while (x < tmp.length - 2){
                            j = x;
                        
                        if (j < filter.length - 3){
                        filter.forEach(e => {
                            connection.query('SELECT `prix` FROM `binary_toll` WHERE `id_toll_entree`=' + tmp[x] + ' AND id_toll_sortie=' + filter[j].id_toll,
                    function (err, r, fields) {
                            if (r.length > 0)
                            prix += parseFloat(r[0].prix);
                            connection.query('UPDATE prix SET pri=' + prix + 'WHERE id_prix=1');
                       //     return (prix);
                          //  if (j == filter.length && x == tmp.length - 2)   
                            // console.log(prix);
                        });
                        j++;   
                    });}
                        x++;
                    }
                    });
                }
            });            
        });
    }
);
}

getPrice(d);
sleep.sleep(400).then(f => {
    console.log("T");
    connection.query('SELECT pri FROM prix WHERE id_prix=1', function(err, result, fields){
        console.log(result);
    });
});




// // requete SQL
// connection.query('SELECT * from `toll` WHERE `longitude` > ' + min_long + ' AND `longitude` < ' + max_long + ' AND `latitude` > ' + min_lat + ' AND `latitude` < ' + max_lat,
//     function (err, result, fields) {
//         result.forEach (e => {
//             var pt = turf.point([e.longitude, e.latitude]); // coord du péage
//             var line = turf.lineString(data);
//             var distance = turf.pointToLineDistance(pt, line, {units: 'kilometers'});
//             if (Number(distance).toFixed(3) < 0.05) {
//                 console.log(Number(distance).toFixed(12));
//                 // console.log(e.longitude);
//                 // console.log(e.latitude);
//             } 
//         });
//     }
// );

/* google map */
// connection.query('SELECT `id_toll_db`, `name`, `latitude`, `longitude` FROM `toll` WHERE name="undefined"',
//     function (err, result, fields) {
//         result.forEach (e => {
//         setTimeout(function() {
//             request('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + e.longitude + ',' + e.latitude +'&sensor=true', { json: true }, (err, res, body) => {
//                 if (err) { return console.log(err); }
//                 console.log(body);
//                 });
//             }, 10000);
//         });
//     }
// );

/* mapquest */
// connection.query('SELECT `id_toll_db`, `name`, `latitude`, `longitude` FROM `toll` WHERE name="undefined"',
//     function (err, result, fields) {
//         result.forEach (e => {
//         // setTimeout(function() {
//             // request('http://www.mapquestapi.com/geocoding/v1/reverse?key=KNOmyZFsc5mtrppANYGZ3JBzeeuGxOwx&location=' + e.latitude + ',' + e.longitude + '&includeRoadMetadata=true&includeNearestIntersection=true', { json: true }, (err, res, body) => {
//                 // if (err) { return console.log(err); }
//                 // console.log(body.results);
//                 console.log(e.latitude);
//                 console.log(e.longitude);
//                 // });
//             // }, 10000);
//         });
//     }
// );



