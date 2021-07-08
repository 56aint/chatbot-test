const express = require('express');

const fs = require('fs');

const bodyParser = require('body-parser');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: './performanceReport.csv',

  append: true,

  header: [
    {id: 'text', title: 'TEXT'},

    {id: 'executiontime', title: 'EXECUTION TIME (in ms)'},

    {id: 'intentmatch', title: 'INTENT MATCH'}
  ]
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json()); // Body parser use JSON data

app.post('/botTopmResponse', function(req, res) {
  const records = [
    req.body
  ];

  csvWriter.writeRecords(records).then(() => {
    res.send('saved');
  });
});

let APP_PORT = 3000;

app.listen(APP_PORT);

console.log(`Now serving your Express app at http://localhost:${APP_PORT}`)

