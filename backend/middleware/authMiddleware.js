import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  console.log("authMiddleware invoked"); // Debugging: Log when middleware is triggered

  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader); // Debugging: Log the authorization header

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Authorization header missing or invalid'); // Debugging: Log invalid header situation
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token); // Debugging: Log the extracted token

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
    if (err) {
      console.log('JWT verification failed:', err.message); // Debugging: Log error during JWT verification
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    console.log('JWT decoded:', decoded); // Debugging: Log the decoded token payload
    req.user = decoded; // attach user data to request object
    console.log('User data attached to request:', req.user); // Debugging: Log the user data attached to request object

    next();
  });
};

export default authMiddleware;
