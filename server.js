'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const books = require('./Modules/books');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Mongoose is connected'));

app.get('/books', books);

app.get('/', (req, res) => res.status(200).send('Default route working'));

mongoose.connect(process.env.MONGODB_URL);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
