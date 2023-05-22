'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const getBooks = require('./Modules/getBooks');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connecrtion error'));
db.once('open', () => console.log('Mongoose is connected'));

app.get('/books', getBooks);

app.get('/', (req, res) => res.status(200).send('Default route working'));

app.get('/get', (request, response) => {
  response.send('test request received');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
