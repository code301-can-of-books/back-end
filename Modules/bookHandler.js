'use strict';

const Book = require('../Model/book');

const bookHandler = {};

bookHandler.getBook = function (req, res) {
  let queryObject = {};

  if (req.query._id) {
    queryObject = { id: req.query._id };
  }
  Book.find(queryObject)
    .then((data) => res.status(200).send(data))
    .catch((err) => console.error(err));
};

bookHandler.postBook = function (req, res, next) {
  const data = req.body;

  Book.create(data)
    .then((createBook) => res.status(201).send(createBook))
    .catch((err) => next(err));
};

bookHandler.deleteBook = function (req, res, next) {
  const { _id } = req.params;
  console.log(_id);
  Book.findByIdAndDelete(_id)
    .then((deletedBook) => res.status(200).send('Book has been deleted'))
    .catch((err) => next(err));
};
module.exports = bookHandler;
