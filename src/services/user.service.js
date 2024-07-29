import sequelize, { DataTypes } from '../config/database';
import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
const User = require('../models/user')(sequelize, DataTypes);

const secretKey = process.env.JWT_SECRET
//user registeration
export const signUp = async (userDetails) => {
  userDetails.password = await bcrypt.hash(userDetails.password, 10);
  if (userDetails.role === 'admin') {
    const adminUser = await User.findOne({
      where: { role: 'admin' }
    });
    if (adminUser) throw new Error('An admin user already exists');
  }

  return await User.create(userDetails);
};

export const signIn = async ({ email, password }) => {
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
    data: { token },
    user: user,
  };
};