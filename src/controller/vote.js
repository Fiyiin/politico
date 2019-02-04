import moment from 'moment';
import connection from '../models/connection';

class Vote {
  static async createVote(req, res) {
    console.log(req.body);
    const { createdBy, office, candidate } = req.body;
    const createdOn = moment.now();
    const voteQuery = 'INSERT INTO votes (created_on, created_by, office, candidate) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [createdOn, createdBy, office, candidate];

    try {
      const { rows } = await connection.query(voteQuery, values);
      return res.status(201).json({
        status: 201,
        data: [{ office: rows[0].office, candidate: rows[0].candidate, voter: rows[0].created_by }],
      });
    } catch (error) {
      console.log(error)
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 409,
          error: 'You can only vote once',
        });
      }
      return res.status(500).json({
        status: 500,
        error: 'Unexpected database error',
      });
    }
  }
}

export default Vote;
