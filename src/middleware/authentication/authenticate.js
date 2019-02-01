import jwt from 'jsonwebtoken';
import connection from '../../models/connection';

class Authenticate {
  static async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'Token not provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const text = 'SELECT * FROM users WHERE id = $1 AND is_admin = true';
      console.log(decoded);
      if (typeof decoded.is_admin !== 'boolean') {
        return res.status(400).json({
          status: 400,
          error: 'The token you provided is invalid',
        });
      }
      const { rows } = await connection.query(text, [decoded.id]);
      if (!rows[0]) {
        return res.status(401).json({
          status: 401,
          error: 'You don\'t have access to this route',
        });
      }
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'invalid token',
      });
    }
  }
}

export default Authenticate;
