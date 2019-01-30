import express from 'express';
import ctrlOffice from '../controller/office';
import validation from '../middleware/validation/officeValidation';
import checkResult from '../middleware/validation/validationResult';

const router = express.Router();
const { checkAddOffice, checkOfficeById } = validation;

router.post('/', checkOfficeById, checkAddOffice, checkResult, ctrlOffice.createNewOffice);
router.get('/', checkResult, ctrlOffice.getAllOffices);
router.get('/:id', checkOfficeById, checkResult, ctrlOffice.getOfficeById);

export default router;
