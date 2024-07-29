import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const signUp = async (req, res) => {
  try {
    const data = await UserService.signUp(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK.valueOf(),
      data: data,
      message: "User created successfully..!"
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      message: error.message
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const data = await UserService.signIn(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK.valueOf(),
      data: data,
      message: "You are logged into bookstore"
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      message: error.message
    });
  }
}