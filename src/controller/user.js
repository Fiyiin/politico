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
      firstname, lastname, othername, email, password, phoneNo, passportUrl, isAdmin,
    } = req.body;
    const hashPassword = Helper.hashPassword(password);


    const createQuery = 'INSERT INTO users (firstname, lastname,othername, email, password, phone_number, passport_url, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const values = [firstname, lastname, othername, email, hashPassword, phoneNo, passportUrl, isAdmin];

    try {
      const { rows } = await connection.query(createQuery, values);
      console.log(rows);
      const token = Helper.generateToken(rows[0].id);
      console.log(token)
      return res.status(201).json({
        token,
        data: [rows[0]],
      });
    } catch (error) {
      console.log(error)
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          status: 400,
          error: 'user ith that EMAIL already exists',
        });
      } return res.status(400).json({
        status: 400,
        error: 'There was a problem registering the user',
      });
    }
  }
}

export default User;
