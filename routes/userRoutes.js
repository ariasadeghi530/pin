const router = require('express').Router();
const passport = require('passport');
const { User } = require('../models');

const jwt = require('jsonwebtoken');

require('dotenv').config();


router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) throw err;
    res.json({
      isLoggedIn: !!user,
      items: user.items,
      user: user.username,
      token: jwt.sign({ id: user._id }, process.env.SECRET)
    });
  })
})

router.post('/users/register', (req, res) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, err => {
    if (err) throw err;
    res.sendStatus(200);
  })
})

router.put('/users/:itemname', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndUpdate(req.user._id, { $push: { items: req.params.itemname } })
    .then((response) => res.json(response))
    .catch(e => console.log(e));
});

module.exports = router;
