const express = require('express');
const db = require('./userDb.js');

const router = express.Router();

// Return user added to db successfully
router.post('/', (req, res) => {
  const user = req.body;
  db.insert(user)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: 'Could not connect to server.' })
    });
  });

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

// Return all users from db
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

// Return user from valid id parameter
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  db.getById(userId)
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'Error connecting to server' })
    })
});

// Return all posts of user from valid id parameter
router.get('/:id/posts', (req, res) => {
  const userId = req.params.id;
  db.getUserPosts(userId)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'Error connecting to server' })
    })
});

// Delete user from valid id parameter
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  db.remove(userId)
    .then(success => {
      res.status(200).json({ message: 'User has been deleted'});
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: 'Could not connect to server' });
    });
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
