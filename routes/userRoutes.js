const router = require('express').Router();
require('dotenv').config();
const passport = require('passport');
const { User, Post } = require('../models');
const TokenGenerator = require('uuid-token-generator');
const nodemailer = require('nodemailer')


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
      id: user._id,
      github: user.github,
      token: jwt.sign({ id: user._id }, process.env.SECRET)
    });
  })
})

// User registration
router.post('/users/register', (req, res) => {
  User.register(new User({
    first: req.body.first,
    last: req.body.last,
    username: req.body.username,
    email: req.body.email,
    github: req.body.github,
    projects: [],
    ideas: [],
    bio: ''
  }), req.body.password, err => {
    if (err) res.send(err);
    res.sendStatus(200);
  })
})

router.post('/forgotPassword', (req, res) => {
  let token = '';
  if(req.body.email === ''){
    res.status(400).json({message: "Email required"});
  }
  User.findOne({email: req.body.email})
  .then((user) =>{
    if(!user){
      res.json({message: `No user with that email found`})
    } else{
      tokenGen = new TokenGenerator();
      token = tokenGen.generate();
     console.log(token)
      User.findByIdAndUpdate(user._id, {resetPwordToken: token})
      .then(() => console.log('db updated'))
      .catch(e => console.error(e));
      const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
          user: 'projectideanetwork@gmail.com',
          pass: 'gulag123'
        }
      });
      let url = process.env.HEROKU_URL || 'http://localhost:3000/resetpassword/';

      const mailOptions = {
        from: 'projectideanetwork@gmail.com',
        to: `${req.body.email}`,
        subject: "Link To Reset Password",
        text: 
        `You are receiving this email because a request for resetting this account's password was made.\n\n`+'If you made this request, please click the link:\n\n'+url+`${token} \n\n`+'If you did not make this request, please ignore this email, but consider updating your password.'
      }
      
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) throw err;
        res.status(200).json({message: "Recovery email has been sent!"})
      });
    }
  })
    .catch(e => console.error(e));
      
})

//reset password form
router.put('/resetPassword/:token', (req, res) => {
  User.findOne({resetPwordToken: req.params.token})
  .then((retuser) => {
    if(!retuser){
      console.log("No user exists");
  }
  if (req.body.password === req.body.confirm){
        retuser.setPassword(req.body.password, function(err) {
            retuser.save(function(err){
              if(err) throw err;
                res.status(200).json({message: "Password successfully reset!"});
            });
        });
  } else {
    res.status(400).json({message: "Passwords do not match"})
  }
})
.catch(e => console.error(e))
});
//logout
// router.get('/users/logout', passport.authenticate('jwt'),(req, res) => {
  
// })

//get a user and their projects/ideas
router.get('/users', passport.authenticate('jwt'), (req, res) => {
  User.findById(req.user._id).populate('ideas').populate('projects')
  .then((user) => res.json(user))
  .catch(e => console.error(e));
})

//update user info and get it back
router.put('/users', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
  .then(() => {User.findById(req.user._id).populate('ideas').populate('projects')
  .then((user) => res.json(user))
  .catch(e => console.error(e));})
  .catch(e => console.error(e));
})

// Pinning a project, saving a project idea
router.put('/users/:projectID', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndUpdate(req.user._id, { $push: { projects: req.params.projectID}})
  .then(() => { 
  User.findById(req.user._id)
  .then((user) => res.json(user))
  .catch(e => console.error)})
});

// removing a project, unpinning
router.delete('/users/:projectID', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndUpdate(req.user._id, { $pull: { projects: req.params.projectID}})
  .then(() => { 
  User.findById(req.user._id)
  .then((user) => res.json(user))
  .catch(e => console.error)})
})



//Delete user account
router.delete('/users', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndDelete(req.user._id)
  .then(() => {Post.deleteMany({owner: req.user._id})
  .then(() => res.sendStatus(200))
  .catch(e => console.error(e));})
  .catch(e => console.error(e))
})

module.exports = router;
