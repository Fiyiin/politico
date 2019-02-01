import dotenv from 'dotenv';
import connection from '../models/connection';
import Helper from '../helpers/helpers';

dotenv.config();

class User {
  static async registerUser(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        error: 'Some values are missing',
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({
        status: 400,
        error: 'Enter a valid email address',
      });
    }

    const {
      firstname, lastname, othername, email, password, phone_number, passportUrl, is_admin,
    } = req.body;
    console.log(is_admin)
    const hashPassword = Helper.hashPassword(password);


    const createQuery = 'INSERT INTO users (firstname, lastname,othername, email, password, phone_number, passport_url, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const values = [firstname, lastname, othername, email, hashPassword,
      phone_number, passportUrl, is_admin];

    try {
      const { rows } = await connection.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id, rows[0].is_admin);
      return res.status(201).json({
        token,
        data: [rows[0]],
      });
    } catch (error) {
      console.log(error);
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: 400,
          error: 'user with that EMAIL already exists',
        });
      } return res.status(400).json({
        status: 400,
        error: 'There was a problem registering the user',
      });
    }
  }

  static async userLogin(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        error: 'Some values are missing',
      });
    }

    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({
        status: 400,
        error: 'Enter a valid email address',
      });
    }

    const text = 'SELECT * FROM USERS WHERE email = $1';
    try {
      const { rows } = await connection.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          error: 'The credentials you provided is incorrect',
        });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
          status: 400,
          error: 'The credentials you provided is incorrect',
        });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).json({
        status: 200,
        data: [{
          token,
          user: rows[0],
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'The credentials you provided',
      });
    }
  }
}

export default User;