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
      return res.status(500).json({
        status: 500,
        error: 'Unexpected database error',
      });
    }
  }

  static async registerForOffice(req, res) {
    const candidate = req.params.id;
    const { office, party } = req.body;
    const text = 'INSERT INTO candidates(office_id, party_id, user_id) VALUES ($1, $2, $3) RETURNING office_id, user_id';
    const values = [office, party, candidate];

    try {
      const { rows } = await pool.query(text, values);
      return res.status(201).json({
        status: 201,
        data: [{ office: rows[0].office_id, user: rows[0].user_id }],
      });
    } catch (error) {
      console.log(error)
      if (error.constraint === 'candidates_user_id_fkey') {
        return res.status(404).json({
          status: 404,
          error: 'No user with that Id',
        });
      }
      if (error.constraint === 'candidates_office_id_fkey') {
        return res.status(404).json({
          status: 404,
          error: 'No Office with that Id',
        });
      }
      if (error.constraint === 'candidates_party_id_fkey') {
        return res.status(404).json({
          status: 404,
          error: 'No party with that Id',
        });
      }
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 409,
          error: 'You can only register once',
        });
      }
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
      return res.status(500).json({
        status: 500,
        error: 'Unexpected database error',
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
          error: 'No office with that Id',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Unexpected database error',
      });
    }
  }

  static async electionResult(req, res) {
    const query = 'SELECT COUNT(votes.candidate_id) AS total_vote, candidates.id, candidates.user_id, candidates.office_id FROM votes, candidates WHERE votes.office_id=$1 GROUP BY candidates.id, candidates.user_id, candidates.office_id';

    try {
      const { rows } = await pool.query(query, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Office with that Id not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{ office: req.params.id, candidate: rows[0].id, result: rows[0].total_vote }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Unexpected database error',
      });
    }
  }
}

export default Office;
