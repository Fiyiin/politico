import party from '../models/party';


class Party {
  /**
   *
   * param {object} req
   * param {object} res
   * return {object} retuns party object
   */

  static createNewParty(req, res) {
    const newParty = req.body;
    party.push(newParty);

    return res.status(201).json({
      status: 201,
      data: [{
        message: newParty,
      }],

    });
  }
}

export default Party;
