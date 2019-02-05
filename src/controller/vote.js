import connection from '../models/connection';

class Vote {
  static async createVote(req, res) {
    console.log(req.user)
    const createdBy = req.user.id;
    const { office, candidate } = req.body;
    const voteQuery = 'INSERT INTO votes (user_id, office_id, candidate_id) VALUES ($1, $2, $3) RETURNING *';
    const values = [createdBy, office, candidate];

    try {
      const { rows } = await connection.query(voteQuery, values);
      return res.status(201).json({
        status: 201,
        data: [{ office: rows[0].office_id, candidate: rows[0].candidate_id, voter: rows[0].user_id }],
      });
    } catch (error) {
      if (error.routine === 'ri_ReportViolation') {
        return res.status(404).json({
          status: 404,
          error: 'No user / office  with that Id exists',
        });
      }
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

