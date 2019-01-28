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
      data: [
        politicalParty,
      ],
    });
  }

  static getPartyById(req, res) {
    const { id } = req.params;
    const party = partyById(politicalParty, id);
    console.log(party[0].name);
    if (party.length === 0) {
      res.status(404).json({
        status: 404,
        error: "Can't find any Party with that Id",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: [party],
      });
    }
  }

  static editParty(req, res) {
    const { id } = req.params;
    const { name, hqAddress, logoUrl } = req.body;
    const party = partyById(politicalParty, id);

    if (party.length === 0) {
      res.status(404).json({
        status: 404,
        error: "Can't find any Party with that Id",
      });
    } else {
      party[0].name = name || '';
      party[0].hqAddress = hqAddress;
      party[0].logoUrl = logoUrl;
      res.status(200).json({
        status: 200,
        data: [party],
      });
    }
  }

  static deleteParty(req, res) {
    const { id } = req.params;
    const party = partyById(politicalParty, id);

    if (party.length !== 1) {
      res.status(404).json({
        status: 404,
        error: "Can't find any Party with that Id",
      });
    } else {
      politicalParty.splice(politicalParty.indexOf(party[0]), 1);
      res.status(204).json({
        status: 204,
        data: [{}],
      });
    }
  }
}

export default Party;
