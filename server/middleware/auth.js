const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Get the token from the headers
    const token = req.headers.authorization.split(' ')[1];
    //  Decode using secret key
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    // Add the userId to the request so we can use it in the controllers
    req.auth = { userId }
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
}