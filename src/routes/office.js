import express from 'express';
import ctrlOffice from '../controller/office';

const router = express.Router();

router.post('/', ctrlOffice.createNewOffice);

export default router;
