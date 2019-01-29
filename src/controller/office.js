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

  /**
   *
   * param {object} req
   * param {object} res
   * return [array] returns array of party object
   */
  static getAllOffices(req, res) {
    res.status(200).json({
      status: 200,
      data: [
        politicalOffice,
      ],
    });
  }
}

export default Office;
