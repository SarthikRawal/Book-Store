import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const signUp = async (req, res) => {
  const data = await UserService.signUp(req.body);
  res.status(HttpStatus.OK).json({
    code: data.code,
    data: data.data,
    message: data.message
  })
};

export const signIn = async (req, res) => {
  const data = await UserService.signIn(req.body);
  res.status(HttpStatus.OK).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
}

export const forgetPassword = async (req, res) => {
  const { email } = req.body
  try {
    const data = await UserService.forgetPassword(email);
    res.status(data.code).json(data);
  } catch (error) {
    console.error('Error in forgetPass controller:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message
    });
  }
}

export const resetPassword = async (req, res) => {
  try {
    // const { id, token } = req.params;
    console.log("-->Token", req.locals.token);
    const { password } = req.body;
    const data = await UserService.resetPassword(password);
    res.status(HttpStatus.OK).json({
      data: data.data,
      message: data.message
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      message: error.message
    });
  }

}