'use strict'

const Book = require('../Model/book');

function getBooks(req, res){
  let queryObject = {};

  if(req.query.location){
    queryObject = {location: req.query.location}
  }

  Book.find(queryObject)
    .then(data => res.status(200).send(data))
    .catch(err => console.error(err));
}

module.exports = getBooks;