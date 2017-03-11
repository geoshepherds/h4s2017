import mapnik from 'mapnik';
import express from 'express';
import path from 'path';
import compression from 'compression';
const app = express();

app.use(compression());

const isDevelopment = process.env.NODE_ENV !== 'production';
const ENTRY_FILE = path.join(__dirname, 'index.html');
const PORT = isDevelopment ? 3000 : process.env.PORT;

app.use(express.static(__dirname));
app.get('*', (req, res) => {
   res.sendFile(path.resolve(ENTRY_FILE));
});

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
