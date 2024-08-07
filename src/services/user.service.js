import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { sendResetPasswordEmail } from '../utils/sendEmail';
import { UniqueConstraintError } from 'sequelize';

const User = require('../models/user')(sequelize, DataTypes);

const secretKey = process.env.JWT_SECRET
//user registeration
export const signUp = async (userDetails) => {
  try {
    if (userDetails != null) {
      userDetails.password = await bcrypt.hash(userDetails.password, 10);

      const data = await User.create(userDetails);
      return {
        code: HttpStatus.CREATED,
        data: data,
        message: 'Created user successfully'
      }
    } else {
      return {
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: 'Enter details correctly'
      }
    }
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return {
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: 'User with this email already exists'
      }
    } else {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: [],
        message: 'Somethinf went wrong'
      }
    }
  }
};

export const signIn = async ({ email, password }) => {
  try {
    if (!email || !password) {
      return {
        code: HttpStatus.BAD_REQUEST,
        data: [],
        message: 'Email and password are required'
      }
    }
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        code: HttpStatus.UNAUTHORIZED,
        data: [],
        message: 'Invalid email or password',
      };
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey);
    //return for successfull log in
    return {
      code: HttpStatus.OK,
      data: { token },
      user: user,
      message: 'Login Successful..!'
    };

  } catch (error) {
    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      data: [],
      message: error.message
    }
  }

};

export const forgetPassword = async (email) => {
  const user = await User.findOne({ where: { email } })

  if (!user) {
    return {
      code: HttpStatus.BAD_REQUEST,
      message: 'No user found..!'
    }
  }
  const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '10m' })

  // const link = `http://localhost:3000/api/v1/reset-password/${user.id}/${token}`;
  // console.log("-->Link", link);

  const userDetail = `UserId - ${user.id} & token - ${token}`
  console.log("--User deatils:", userDetail);

  await sendResetPasswordEmail(user.email, token);

  return {
    code: HttpStatus.OK,
    data: user,
    message: 'Link sent on the mail'
  }
}

export const resetPassword = async (newPassword, userId) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    newPassword = hashedPassword;
    const user = await User.update({ password: newPassword }, { where: { id: userId } });

    return {
      code: HttpStatus.OK,
      data: user,
      message: 'Password updated 🫡'
    }
  } catch (error) {
    return {
      code: HttpStatus.BAD_GATEWAY,
      data: [],
      message: error.message
    }
  }
}