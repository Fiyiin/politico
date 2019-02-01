import pool from '../models/connection';

class Office {
  /**
   * Creates new office object
   *
   * @param {object} req
   * @param {object} res
   * @return {object} The office object
   */
  static async createNewOffice(req, res) {
    const { type, name } = req.body;
    const text = 'INSERT INTO offices (type, name) VALUES($1, $2) RETURNING *';
    const values = [type, name];

    try {
      const { rows } = await pool.query(text, values);
      return res.status(201).json({
        status: 201,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'All fields must be filled',
      });
    }
  }

  static async registerForOffice(req, res) {
    const { office, party, candidate } = req.body;
    const text = 'INSERT INTO candidates(office, party, candidate) VALUES ($1, $2, $3) RETURNING *';
    const values = [office, party, candidate];

    try {
      const { rows } = await pool.query(text, values);
      return res.status(201).json({
        status: 201,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Unexpected database error',
      });
    }
  }

  /**
   * Gets the office array
   *
   * @param {object} req
   * @param {object} res
   * @returns {Array} The array of office objects
   */
  static async getAllOffices(req, res) {
    const findAllQuery = 'SELECT * FROM offices';

    try {
      const { rows, rowCount } = await pool.query(findAllQuery);
      return res.status(200).json({
        status: 200,
        data: [{ rows, rowCount }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'Bad request',
      });
    }
  }

  /**
   * Gets the office object with the given Id
   *
   * @param {object} req
   * @param {object} res
   * @returns {Array} Array containing the office object
   */
  static async getOfficeById(req, res) {
    const text = 'SELECT * FROM offices WHERE id = $1';

    try {
      const { rows } = await pool.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'office not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'No office with that Id',
      });
    }
  }
}

export default Office;
