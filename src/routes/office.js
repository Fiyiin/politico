import express from 'express';
import ctrlOffice from '../controller/office';
import validation from '../middleware/validation/officeValidation';
import checkResult from '../middleware/validation/validationResult';
import auth from '../middleware/authentication/authenticate'

const router = express.Router();
const { checkAddOffice } = validation;

router.post('/', checkAddOffice, checkResult, ctrlOffice.createNewOffice);
router.get('/', checkResult, ctrlOffice.getAllOffices);
router.get('/:id', checkResult, ctrlOffice.getOfficeById);
router.post('/:id/register', auth.verifyToken, ctrlOffice.registerForOffice);

export default router;
