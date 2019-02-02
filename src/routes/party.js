import express from 'express';

import ctrlParty from '../controller/party';
import validation from '../middleware/validation/partyValidation';
import checkResult from '../middleware/validation/validationResult';
import auth from '../middleware/authentication/authenticate';

const router = express.Router();
const { checkAddParty, checkPartyById, checkEditParty } = validation;
const { verifyToken, adminStatus } = auth;

router.post('/', checkAddParty, checkResult, verifyToken, adminStatus, ctrlParty.createNewParty);
router.get('/', verifyToken, ctrlParty.getAllParties);
router.get('/:id', checkPartyById, checkResult, verifyToken, ctrlParty.getPartyById);
router.patch('/:id/name', checkPartyById, checkEditParty, checkResult, verifyToken, adminStatus, ctrlParty.editParty);
router.delete('/:id', checkPartyById, checkResult, verifyToken, adminStatus, ctrlParty.deleteParty);

export default router;
