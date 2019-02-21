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
      req.user = { id: decoded.id, is_admin: decoded.is_admin };
      next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'invalid token',
      });
    }
  }

  static async adminStatus(req, res, next) {
    const { id, is_admin } = req.user;
    const isAdmin = is_admin;
    const query = 'SELECT * FROM users WHERE id = $1 AND is_admin = true';
    try {
      if (typeof isAdmin !== 'boolean') {
        return res.status(400).json({
          status: 400,
          error: 'The token you provided is invalid',
        });
      }
      const { rows } = await connection.query(query, [id]);
      if (!rows[0]) {
        return res.status(403).json({
          status: 403,
          error: 'You don\'t have access to this route',
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Unexpected database error',
      });
    }
  }
}

export default Authenticate;
