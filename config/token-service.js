const jwt = require('jsonwebtoken'); 

const secrets = require('./secrets');

module.exports = {
  generateToken,
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1d',
  };

//   const secret = "this is a Secret"

  return jwt.sign(payload, secrets.jwtSecret, options);
}
