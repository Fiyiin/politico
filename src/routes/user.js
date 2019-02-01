import express from 'express';
import ctrlUser from '../controller/user';
import validation from '../middleware/validation/userValidation';
import checkResult from '../middleware/validation/validationResult'; 

const router = express.Router();

router.post('/signup', validation.checkAddUser, checkResult, ctrlUser.registerUser);
router.post('/login', ctrlUser.userLogin);

export default router;
