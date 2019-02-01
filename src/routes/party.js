import express from 'express';

import ctrlParty from '../controller/party';
import validation from '../middleware/validation/partyValidation';
import checkResult from '../middleware/validation/validationResult';
import auth from '../middleware/authentication/authenticate';

const router = express.Router();
const { checkAddParty, checkPartyById, checkEditParty } = validation;

router.post('/', checkAddParty, checkResult, ctrlParty.createNewParty);
router.get('/', checkResult, ctrlParty.getAllParties);
router.get('/:id', checkPartyById, checkResult, ctrlParty.getPartyById);
router.patch('/:id/name', checkPartyById, checkEditParty, checkResult, auth.verifyToken, ctrlParty.editParty);
router.delete('/:id', checkPartyById, checkResult, auth.verifyToken, ctrlParty.deleteParty);

export default router;
