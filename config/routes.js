const axios = require('axios');
const bcrypt = require('bcryptjs');

const tokenService = require('./token-service');
const Users = require('./models')
const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 3)
  user.password = hash;
    Users. add(user)
      .then(saved =>{
        res.status(201).json(saved)
      })
      .catch(err =>{
        res.status(500).json(err)
      })
}

function login(req, res) {
  // implement user login
  let{ username, password } = req.body;

  Users.findBy({ username })
  .first()
  .then(user =>{
    if (user && bcrypt.compareSync(password, user.password)){
      const token = tokenService.generateToken(user);
      res.status(200).json({
        message : `Welcom ${user.username}!`,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid Login'})
    }
  })
  .catch(err =>{
    res.status(500).json(err)
  })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
