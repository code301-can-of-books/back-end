'use strict';

const Book = require('../Model/book');

const bookHandler = {};

bookHandler.getBook = function (req, res, next) {
  console.log('message');
  let queryObject = { email: req.user.email };
  Book.find(queryObject)
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err));
};

bookHandler.postBook = function (req, res, next) {
  Book.create({ ...req.body, email: req.user.email })
    .then((createBook) => res.status(201).send(createBook))
    .catch((err) => next(err));
};

bookHandler.updateBook = function (req, res, next) {
  const id = req.params.id;

  Book.findByIdAndUpdate(id,
    { ...req.body, email: req.user.email },
    { new: true, overwrite: true }
  )
    .then((updateBook) => {
      res.status(200).send(updateBook);
    })
    .catch((err) => next(err));
};
bookHandler.deleteBook = function (req, res, next) {
  const id = req.params.id;
  Book.findByIdAndDelete(id)
    .then((deletedBook) => res.status(200).send('Book has been deleted'))
    .catch((err) => next(err));
};

module.exports = bookHandler;
