import politicalOffice from '../models/office';

class Office {
  /**
   *
   * param {object} req
   * param {object} res
   * return {object} retuns party object
   */

  static createNewOffice(req, res) {
    const newParty = req.body;
    politicalOffice.push(newParty);

    return res.status(201).json({
      status: 201,
      data: [newParty,
      ],

    });
  }
}

export default Office;
