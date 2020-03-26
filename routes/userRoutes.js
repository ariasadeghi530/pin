const router = require('express').Router();
const passport = require('passport');
const { User } = require('../models');

const jwt = require('jsonwebtoken');

require('dotenv').config();

// User login
router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) throw err;
    res.json({
      isLoggedIn: !!user,
      ideas: user.ideas,
      projects: user.projects,
      user: user.username,
      token: jwt.sign({ id: user._id }, process.env.SECRET)
    });
  })
})

// User registration
router.post('/users/register', (req, res) => {
  User.register(new User({
    username: req.body.username,
    email: req.body.email,
    github: req.body.github
  }), req.body.password, err => {
    if (err) throw err;
    res.sendStatus(200);
  })
})

//logout
// router.get('/users/logout', passport.authenticate('jwt'),(req, res) => {
  
// })

//update user info
router.put('/users/update', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
  .then(user => res.json(user))
  .catch(e => console.error(e));
})

// Pinning a project, saving a project idea
router.put('/users/:projectID', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndUpdate(req.user._id, { $push: { projects: req.params.projects}})
})

//Delete user account
router.delete('/users/delete', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndDelete(req.user._id)
  .then(() => res.sendStatus(200))
  .catch(e => console.error(e))
})

module.exports = router;
