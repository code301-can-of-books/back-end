'use strict';

const Book = require('../Model/book');

function getBooks(req, res) {
  let queryObj = {};

  if (req.query.location) {
    queryObj = { location: req.query.location };
  }

  Book.find(queryObj)
    .then((data) => res.status(200).send(data))
    .catch((err) => console.error(err));
}

module.exports = getBooks;
