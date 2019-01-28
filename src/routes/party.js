import express from 'express';

import ctrlParty from '../controller/party';

const router = express.Router();

router.post('/', ctrlParty.createNewParty);
router.get('/', ctrlParty.getAllParties);
router.get('/:id', ctrlParty.getPartyById);
router.patch('/:id', ctrlParty.editParty);
router.delete('/:id', ctrlParty.deleteParty);

export default router;
