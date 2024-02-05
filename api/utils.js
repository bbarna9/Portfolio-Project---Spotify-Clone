import jwt from 'jsonwebtoken';

export const verify = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    // const token = authHeader.split(' ')[1];
    const token = authHeader;

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json('Token is invalid!');
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json('You are not authenticated!');
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json('You are not an admin!');
  }
};
