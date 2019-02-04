import express from 'express';
import ctrlOffice from '../controller/office';
import validation from '../middleware/validation/officeValidation';
import checkResult from '../middleware/validation/validationResult';
import auth from '../middleware/authentication/authenticate';

const { verifyToken, adminStatus } = auth;

const router = express.Router();
const { checkAddOffice, checkOfficeById, checkUserById, checkRegister } = validation;

router.post('/', checkAddOffice, checkResult, verifyToken, adminStatus, ctrlOffice.createNewOffice);
router.get('/', verifyToken, checkResult, ctrlOffice.getAllOffices);
router.get('/:id', checkOfficeById, checkResult, verifyToken, ctrlOffice.getOfficeById);
router.post('/:id/register', checkUserById, checkRegister, checkResult, verifyToken, adminStatus, ctrlOffice.registerForOffice);
router.get('/:id/result', checkOfficeById, checkResult, verifyToken, ctrlOffice.electionResult);
export default router;
