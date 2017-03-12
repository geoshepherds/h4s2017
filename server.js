// import mapnik from 'mapnik';
import express from 'express';
import path from 'path';
import fs from 'fs';
import compression from 'compression';
import { json } from 'body-parser';
// import csv from 'fast-csv';
import { csvtogeojson } from 'csvtogeojson';
// import csv from 'express-csv';
import tilelive from 'tilelive';
import tileliveFile from 'tilelive-file';

tileliveFile.registerProtocols(tilelive);

const app = express();
app.use(json());
app.use(compression());

const isDevelopment = process.env.NODE_ENV !== 'production';
const BUILDINGS_FILE = path.join(__dirname, 'resources/');
const WINTER_FILE = path.join(__dirname, 'data/winter/');
const SUMMER_FILE = path.join(__dirname, 'data/summer/');
const ENTRY_FILE = path.join(__dirname, 'index.html');
const PORT = isDevelopment ? 3000 : process.env.PORT;

app.use(express.static(__dirname));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});


tilelive.load(`file://${WINTER_FILE}`, (err, source) => {
   if (err) throw err;

   app.get('/winter/:z/:x/:y.png', (req, res) => {
      const { z, x, y } = req.params;

      source.getTile(z, x, y, (err, tile, headers) => {
         if (err) {
            res.status(404);
            // res.send(err.message);
         } else {
            res.status(200);
            res.set(headers);
            res.send(tile);
         }
      });
   });
});

tilelive.load(`file://${SUMMER_FILE}`, (err, source) => {
   if (err) throw err;

   // console.log(source);
   app.get('/summer/:z/:x/:y.png', (req, res) => {
      const { z, x, y } = req.params;

      console.log(`Fetching %d %d %d ${z} ${x} ${y}`);
      source.getTile(z, x, y, (err, tile, headers) => {
         if (err) {
            res.status(404);
            // res.send(err.message);
         } else {
            res.status(200);
            res.set(headers);
            res.send(tile);
         }
      });
   });
});

const sthlmBuildings = fs.readFileSync(path.join(BUILDINGS_FILE, 'sthlm.csv'), 'utf8');
console.log(sthlmBuildings);

app.get('/buildings', (req, res) => {
   csvtogeojson(sthlmBuildings, (err, data) => {
      if (err) throw err;

      console.log(data);

   })
});

// const sthlmBuildings = csvStream.fromPath(path.join(BUILDINGS_FILE, 'sthlm.csv'))
//    .on('data', (data) => {})
//    .on('end', () => {
//       console.log(BUILDINGS_FILE, ' DONE');
//       app.get('/buildings', (req, res) => {
//          res.csv(sthlmBuildings);
//       });
//    });



// app.get('/:z/:x/:y', (req, res) => {
//
//    const { z, x, y } = req.params;
//
//    const map = new mapnik.Map(256, 256);
//
//    const bbox = mercator.xyz_to_envelope(x, y, z, false);
//
//    map.extent = bbox;
//
// })

// Port setup
app.set('port', PORT);

app.listen(app.get('port'));
