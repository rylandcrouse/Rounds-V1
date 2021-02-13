import express from 'express';
import {autoSignIn, match, refresh, signIn, signUp} from '../controllers/auth.js';

const router = express.Router();

router.post('/match', match);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/refresh', refresh);
router.post('/auto', autoSignIn);


export default router;
