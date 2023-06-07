'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookHandler = require('./Modules/bookHandler');
const verifyUser = require('./Modules/Authorize');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Mongoose is connected'));

app.get('/', (req, res) => res.status(200).send('Default route working'));

app.use(verifyUser);

app.get('/book', bookHandler.getBook);
app.post('/book', bookHandler.postBook);
app.put('/book/:_id', bookHandler.updateBook);
app.delete('/book/:_id', bookHandler.deleteBook);

app.use((err, req, res, next) => res.status(500).send(err.message));

app.listen(PORT, () => console.log(`listening on ${PORT}`));
