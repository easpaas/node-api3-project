const express = require('express');
const userDB = require('./userDb.js');
const postDB = require('../posts/postDb.js');
const router = express.Router();

// Return user added to db successfully
router.post('/', validateUser, (req, res) => {
  const user = req.body;
  userDB.insert(user)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: 'Could not add user.' })
    });
  });

// Return post for user from valid id parameter
router.post('/:id/posts', validateUserId, (req, res) => {
  const post = { ...req.body, user_id: req.params.id };
  postDB.insert(post)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: 'Error connecting to server.' });
    });
});

// Return all users from db
router.get('/', (req, res) => {
  userDB.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: 'Error connecting to server'});
    });
});

// Return user from valid id parameter
router.get('/:id', validateUserId, (req, res) => {
  const userId = req.params.id;
  userDB.getById(userId)
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: `Error retrieving user with id ${userId}` })
    })
});

// Return all posts of user from valid id parameter
router.get('/:id/posts', validateUserId, (req, res) => {
  const userId = req.params.id;
  userDB.getUserPosts(userId)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'Error connecting to server' })
    })
});

// Delete user from valid id parameter
router.delete('/:id', validateUserId, (req, res) => {
  const userId = req.params.id;
  userDB.remove(userId)
    .then(success => {
      res.status(200).json({ message: 'User has been deleted'});
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: 'Could not connect to server' });
    });
});

// Return success after user is updated with db
router.put('/:id', validateUserId, (req, res) => {
  userDB.update(req.params.id, req.body) 
    .then(success => {
      console.log(success);
      res.status(201).json(success);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'Error connecting to server.' });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const userId = req.params.id;
  userDB.getById(userId)
    .then(success => {
      res.status(201).json(success)
    })
    .catch(error => {
      res.status(404).json({ errorMessage: `Could not find user with id ${userId}` });
    });
  
  next();
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: 'Missing user data.' })
  } else if (!req.body.name) {
    res.status(400).json({ message: 'Missing required name field.' })
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
