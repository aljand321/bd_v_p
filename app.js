import http from 'http'
import express from 'express'

import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';

import path from 'path';
var cors = require('cors')

const hostname = '127.0.0.1';
const red = '192.168.1.152';
const port = process.env.PORT || 3000;
const app = express()
const server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
routes(app);

// this folders for this application will be used to store public file images
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/*', (req, res) => res.status(200).send({
  message: 'Welcome to the .',
}));

server.listen(port, red | hostname, () => {
  console.log(`Server running at http://${red}:${port}/`);
});