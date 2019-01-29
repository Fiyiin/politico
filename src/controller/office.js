import politicalOffice from '../models/office';
import findById from '../helpers/helpers';

class Office {
  /**
   * Creates new office object
   *
   * @param {object} req
   * @param {object} res
   * @return {object} The party object
   */
  static createNewOffice(req, res) {
    const newOffice = req.body;
    politicalOffice.push(newOffice);

    return res.status(201).json({
      status: 201,
      data: [newOffice,
      ],

    });
  }

  /**
   * Gets the array containing all party objects
   *
   * @param {object} req
   * @param {object} res
   * @returns {Array} Array containing all office objects
   */
  static getAllOffices(req, res) {
    res.status(200).json({
      status: 200,
      data: [
        politicalOffice,
      ],
    });
  }

  /**
   * Gets the office object with the given Id
   *
   * @param {object} req
   * @param {object} res
   * @returns {array} Array containing the office object
   */
  static getOfficeById(req, res) {
    const { id } = req.params;
    const office = findById(politicalOffice, id);

    if (office.length === 0) {
      res.status(404).json({
        status: 404,
        error: "Can't find any Office with that Id",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: [office],
      });
    }
  }
}

export default Office;
