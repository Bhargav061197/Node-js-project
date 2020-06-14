const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {     //this sends the req.user.email to all apis which is decoded from jwt token
 
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}