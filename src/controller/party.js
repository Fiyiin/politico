import politicalParty from '../models/party';
import findById from '../helpers/helpers';

class Party {
  /**
   * Creates new party object
   *
   * @param {object} req
   * @param {object} res
   * @return {object} The party object
   */
  static createNewParty(req, res) {
    const { id } = req.body;
    const party = findById(politicalParty, id);

    if (party.length === 0) {
      const newParty = req.body;
      politicalParty.push(newParty);

      return res.status(201).json({
        status: 201,
        data: [{
          data: newParty,
        }],

      });
    }
    return res.status(409).json({
      status: 409,
      error: 'Party with that Id already exists',
    });
  }

  /**
   * Gets the party array
   *
   * @param {object} req
   * @param {object} res
   * @returns {Array} The array of party objects
   */
  static getAllParties(req, res) {
    res.status(200).json({
      status: 200,
      data: [
        politicalParty,
      ],
    });
  }

  /**
   * Gets the party object with the given Id
   *
   * @param {object} req
   * @param {object} res
   * @returns {Array} Array containing the party object
   */
  static getPartyById(req, res) {
    const { id } = req.params;
    const party = findById(politicalParty, id);

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

  /**
   * Edits the party object with the given Id
   *
   * @param {object} req
   * @param {object} res
   * @return {object} The updated party object
   */
  static editParty(req, res) {
    const { id } = req.params;
    const { name, hqAddress, logoUrl } = req.body;
    const party = findById(politicalParty, id);

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

  /**
   * Deletes the party object with the given Id
   *
   * @param {object} req
   * @param {object} res
   * @return {void}
   */
  static deleteParty(req, res) {
    const { id } = req.params;
    const party = findById(politicalParty, id);

    if (!Array.isArray(party) || !party.length) {
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
