import express from 'express';
import ctrlUser from '../controller/user';
import validation from '../middleware/validation/userValidation';
import checkResult from '../middleware/validation/validationResult'; 

const router = express.Router();
const { checkAddUser, checkEmail } = validation;

router.post('/signup', checkAddUser, checkResult, ctrlUser.registerUser);
router.post('/login', checkEmail, checkResult, ctrlUser.userLogin);

export default router;
