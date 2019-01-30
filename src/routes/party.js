import express from 'express';

import ctrlParty from '../controller/party';

const router = express.Router();

router.post('/', ctrlParty.createNewParty);
router.get('/', ctrlParty.getAllParties);

export default router;
