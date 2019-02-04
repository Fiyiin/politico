import express from 'express';
import ctrlVote from '../controller/vote';
import auth from '../middleware/authentication/authenticate';

const router = express.Router();
const { verifyToken, adminStatus } = auth;

router.post('/', verifyToken, adminStatus, ctrlVote.createVote);

export default router;
