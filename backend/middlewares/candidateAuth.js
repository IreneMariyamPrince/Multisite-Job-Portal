/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-env es6 */
const jwt = require('jsonwebtoken');

function candidateAuth(req, res, next) {
  // Check if the request contains a token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized - Bearer token missing' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if(decoded.userRole!=4){
      return res.status(500).json({error:`You don't have permission to access this route`})
    }
    // Extract candidate ID from decoded token
    req.userId = decoded.userId;
    next();
  });
}

module.exports = candidateAuth;
