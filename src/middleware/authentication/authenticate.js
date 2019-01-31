import jwt from 'jsonwebtoken';

class Authenticate {
  static verify(req, res, next) {
    const bearerHeader = req.headers.authorization;
    const error = 'Authentication failed';

    if (typeof bearerHeader === 'undefined') {
      return res.status(403).json({
        status: 403,
        error,
      });
    }

    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;

    return jwt.verify(req.token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          error,
        });
      }
      return next();
    });
  }

  static sign(req, res) {
    const { user, success } = req;
    const userId = user[0].user_id;
    const isAdmin = user[0].is_admin;

    return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, (error, token) => {
      if (error) {
        return res.status(401).send({ error: 'Unexpected token error occurred' });
      }
      return res.status(201).send({ success, user: user[0], token });
    });
  }

  static signEmail(req, res, next) {
    const { user } = req;

    return jwt.sign({ email: user[0].email, exp: Math.floor(Date.now() / 1000) + (30 * 60) },
      process.env.JWT_SECRET, (error, token) => {
        if (error) {
          return res.status(401).send({ error: 'Unexpected token error occurred' });
        }
        req.link = `http://localhost:3000/api/v1/auth/resetPassword/${token}`;
        req.email = user[0].email;
        return next();
      });
  }
}

export default Authenticate;