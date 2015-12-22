'use strict';
const express = require('express');
const app = express();
const router = express.Router();

const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

const SIGNUPS = 200;

let signups = [];

// Fetch users from randomuser

fetch('http://api.randomuser.me/?results=' + SIGNUPS)
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    signups = json.results;
    console.log('Test data ready');
  });

router.get('/signups/count', (req, res) => {
  res.json({
    count: signups.length
  });
});

router.get('/signups', (req, res) => {
  const startIndex = parseInt(req.query.index) || 0;
  const count = parseInt(req.query.count) || 100;
  let endIndex = startIndex + count;
  if (endIndex > signups.length) {
    endIndex = signups.length;
  }
  let result = signups.slice(startIndex, endIndex);
  res.json(result);
});

app.use(cors());
app.use(morgan('dev'));
app.use('/', router);
app.listen(8080);

console.log('Server started on 8080');
