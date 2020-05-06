const express = require('express');
const db = require('./userDb.js');

const router = express.Router();


router.post('/', (req, res) => {
  // do something!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: 'Error connecting to server'});
    });
});

router.get('/:id', (req, res) => {
  db.getById(req.params.id)
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'Error connecting to server' })
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
