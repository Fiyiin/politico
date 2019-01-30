import politicalParty from '../models/party';
import partyById from '../helpers/helpers';

class Party {
  /**
   *
   * param {object} req
   * param {object} res
   * return {object} retuns party object
   */

  static createNewParty(req, res) {
    const newParty = req.body;
    politicalParty.push(newParty);

    return res.status(201).json({
      status: 201,
      data: [{
        message: newParty,
      }],

    });
  }

  /**
   *
   * param {object} req
   * param {object} res
   * return [array] returns array of party object
   */
  static getAllParties(req, res) {
    res.status(200).json({
      status: 200,
      data: [{
        message: politicalParty,
      }],
    });
  }

  static getPartyById(req, res) {
    const { id } = req.params;
    const findParty = partyById(politicalParty, id);
    console.log(findParty[0].name);
    if (findParty.length === 0) {
      res.status(404).json({
        status: 404,
        error: "Can't find any Party with that Id",
      });
    } else {
      res.status(200).json({
        status: 200,
        findParty,
      });
    }
  }

  static editParty(req, res) {
    const { id } = req.params;
    const { name, hqAddress, logoUrl } = req.body;
    const findParty = partyById(politicalParty, id);

    if (findParty.length === 0) {
      res.status(404).json({
        status: 404,
        error: "Can't find any Party with that Id",
      });
    } else {
      findParty[0].name = name || '';
      findParty[0].hqAddress = hqAddress;
      findParty[0].logoUrl = logoUrl;
      res.status(200).json({
        status: 200,
        findParty,
      });
    }
  }

}

export default Party;
