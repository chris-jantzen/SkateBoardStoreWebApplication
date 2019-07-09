const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const routes = require('./routes/routes').routes;

const connection = mysql.createConnection({
  host: 'localhost',
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  database: 'SkateBoardStore',
  port: process.env.DB_PORT
});

console.log(`Connected to db on port ${process.env.DB_PORT}`);

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

routes(app, connection);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + 'public/index.html'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
