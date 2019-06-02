import dotenv from 'dotenv';
import connection from '../models/connection';
import Helper from '../helpers/helpers';

dotenv.config();

class User {
  static async registerUser(req, res) {
    let { isAdmin } = req.body;
    const {
      firstname, lastname, othername, email, password, phoneNumber, passportUrl,
    } = req.body;

    isAdmin === true ? isAdmin = true : isAdmin = false;

    const hashPassword = Helper.hashPassword(password);

    const createQuery = 'INSERT INTO users (firstname, lastname, othername, email, password, phone_number, passport_url, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

    const values = [firstname, lastname, othername, email, hashPassword,
      phoneNumber, passportUrl, isAdmin];

    try {
      const { rows } = await connection.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id, rows[0].is_admin, rows[0].firstname, rows[0].lastname, rows[0].email, rows[0].phone_number);
      return res.status(201).json({
        data: [{
          token,
          user: {
            id: rows[0].id,
            firstname: rows[0].firstname,
            lasttname: rows[0].lastname,
            othername: rows[0].othername,
            email: rows[0].email,
            phoneNumber: rows[0].phone_number,
          },
        }],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 409,
          error: 'user with that email already exists',
        });
      } return res.status(500).json({
        status: 500,
        error: 'Unexpected database error',
      });
    }
  }

  static async userLogin(req, res) {
    const text = 'SELECT * FROM USERS WHERE email = $1';
    try {
      const { rows } = await connection.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          error: 'No user with that email',
        });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
          status: 400,
          error: 'the password is incorrect',
        });
      }
      const token = Helper.generateToken(rows[0].id, rows[0].is_admin, rows[0].firstname, rows[0].lastname, rows[0].email, rows[0].phone_number);
      return res.status(200).json({
        status: 200,
        data: [{
          token,
          user: {
            id: rows[0].id,
            firstname: rows[0].firstname,
            lastname: rows[0].lastname,
            othername: rows[0].othername,
            email: rows[0].email,
            phoneNumber: rows[0].phone_number,
            isAdmin: rows[0].is_admin,
          },
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Unexpected database error',
      });
    }
  }
}

export default User;
