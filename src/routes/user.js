import express from 'express';
import ctrlUser from '../controller/user';

const router = express.Router();

router.post('/signup', ctrlUser.registerUser);

export default router;
