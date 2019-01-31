import { pool } from 'pg';
import connection from '../models/connection';

class Party {
  /**
   * Creates new party object
   *
   * @param {object} req
   * @param {object} res
   * @return {object} The party object
   */
  static async createNewParty(req, res) {
    const { name, hqAddress, logoUrl } = req.body;

    const text = 'INSERT INTO parties (name, hq_address, logo_url) VALUES($1, $2, $3) RETURNING *';

    const values = [name, hqAddress, logoUrl];
    try {
      const { rows } = await connection.query(text, values);
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


  /**
   * Gets the party array
   *
   * @param {object} req
   * @param {object} res
   * @returns {Array} The array of party objects
   */
  static async getAllParties(req, res) {
    const findAllQuery = 'SELECT * FROM parties';

    try {
      const { rows, rowCount } = await connection.query(findAllQuery);
      return res.status(200).json({
        status: 200,
        data: [{ rows, rowCount }],
      });
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: 400,
        error: 'Bad request',
      });
    }
  }

  /**
   * Gets the party object with the given Id
   *
   * @param {object} req
   * @param {object} res
   * @returns {Array} Array containing the party object
   */
  static async getPartyById(req, res) {
    const text = 'SELECT * FROM parties WHERE id = $1';

    try {
      const { rows } = await connection.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Party not found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'No party with that Id',
      });
    }
  }

  /**
   * Edits the party object with the given Id
   *
   * @param {object} req
   * @param {object} res
   * @return {object} The updated party object
   */
  static async editParty(req, res) {
    const findOneQuery = 'SELECT * FROM parties WHERE id=$1';
    const updateParty = `UPDATE parties
      SET name=$1 returning *`;

    try {
      const { rows } = await connection.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 400,
          error: 'Party not found',
        });
      }

      const response = await connection.query(updateParty, [req.body.name]);
      return res.status(200).json({
        status: 200,
        data: response.rows[0],
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: 'Bad request',
      });
    }
  }

  /**
   * Deletes the party object with the given Id
   *
   * @param {object} req
   * @param {object} res
   * @return {void}
   */
  static async deleteParty(req, res) {
    const deleteQuery = 'DELETE FROM parties WHERE id=$1 returning *';

    try {
      const { rows } = await connection.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Party not found',
        });
      }
      return res.status(410).json({
        status: 410,
        data: [{ message: 'deleted' }],
      });
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: 400,
        error: 'Bad request',
      });
    }
  }
}

export default Party;
