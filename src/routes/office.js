import express from 'express';
import ctrlOffice from '../controller/office';

const router = express.Router();

router.post('/', ctrlOffice.createNewOffice);
router.get('/', ctrlOffice.getAllOffices);

export default router;
