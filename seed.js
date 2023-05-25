'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const Book = require('./Model/book');

const { describe } = require('node:test');

async function seed() {
  const myBook = new Book({
    title: 'The Last Word',
    description:
      'After posting a negative review of a horror novel, a woman staying at an isolated beach house begins to wonder if the author is a little touchy—or very, very dangerous—in this pulse-pounding novel of psychological suspense and terror from the critically acclaimed author of No Exit and Hairpin Bridge.',
    status: 'Not Complete',
  });

  await myBook
    .save()
    .then(() => console.log('Saved book to the DB', typeof myBook))
    .catch((err) => console.error(err));

  await Book.create({
    title: 'Where They Lie',
    description:
      'The murder of an influencer’s family exposes the disturbing secrets behind the facade in a haunting novel of suspense by Joe Hart, Wall Street Journal bestselling author of Or Else.',
    status: 'Not Complete',
  })

    .then(() => console.log('Saved Book 2 to the DB'))
    .catch((err) => console.error(err));

  await Book.create({
    title: 'Far Gone',
    description:
      'From the USA Today bestselling author of White Out comes a story of two heroines with shattered pasts and a town with blood on its hands.',
    status: 'Not Complete',
  })
    .then(() => console.log('Saved Book 3 to the DB'))
    .catch((err) => console.error(err));

  mongoose.disconnect();
}

seed();
