'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const Book = require('./Model/book');

async function seed() {
  const myBook = new Book({
    title: 'The View ',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    status: 'Completed',
  });

  await myBook
    .save()
    .then(() => console.log('Saved to The View to DB'))
    .catch((error) => console.error(error));

  await Book.create({
    title: 'Mask Man ',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    status: 'Not Completed',
  })
    .then(() => console.log('Saved to Mask Man to DB'))
    .catch((error) => console.error(error));

  await Book.create({
    title: 'Untold Adventure',
    description:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    status: 'Completed',
  })
    .then(() => console.log('Saved to Untold Adventure to DB'))
    .catch((error) => console.error(error));

  mongoose.disconnect();
}

seed();
