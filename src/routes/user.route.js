import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
// import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.post('', newUserValidator, userController.signUp);

//route user login
router.post('/signIn', userController.signIn);

export default router;
