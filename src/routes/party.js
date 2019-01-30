import express from 'express';

import ctrlParty from '../controller/party';
import validation from '../middleware/validation/partyValidation';
import checkResult from '../middleware/validation/validationResult';

const router = express.Router();
const { checkAddParty, checkPartyById } = validation;

router.post('/', checkPartyById, checkAddParty, checkResult, ctrlParty.createNewParty);
router.get('/', checkPartyById, checkResult, ctrlParty.getAllParties);
router.get('/:id', checkPartyById, checkResult, ctrlParty.getPartyById);
router.patch('/:id/name', checkPartyById, checkResult, ctrlParty.editParty);
router.delete('/:id', checkPartyById, checkResult, ctrlParty.deleteParty);

export default router;
