import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator, emailValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { handleRole } from '../middlewares/handleRole'

const router = express.Router();

//route to get all users
router.post('', newUserValidator, handleRole, userController.signUp);

// route for admin registration
router.post('/adminsignup', newUserValidator, handleRole, userController.signUp);

//route user login
router.post('/signin', userController.signIn);

//forget password
router.post('/forgetpassword', emailValidator, userController.forgetPassword);

//reset password
router.put('/resetpassword', userAuth, userController.resetPassword);

export default router;
