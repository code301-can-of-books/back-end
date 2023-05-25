'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookHandler = require('./Modules/bookHandler');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Mongoose is connected'));

app.get('/', (req, res) => res.status(200).send('Default route working'));

app.get('/book', bookHandler.getBook);
app.post('/book', bookHandler.postBook);
app.delete('/book/:_id', bookHandler.deleteBook);

mongoose.connect(process.env.MONGODB_URL);
app.listen(PORT, () => console.log(`listening on ${PORT}`));
