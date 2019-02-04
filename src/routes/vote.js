import express from 'express';
import ctrlVote from '../controller/vote';
import auth from '../middleware/authentication/authenticate';

const router = express.Router();
const { verifyToken } = auth;

router.post('/', verifyToken, ctrlVote.createVote);

export default router;
