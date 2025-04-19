import * as authServices from '../services/authServices.js'
import createError from '../utils/appError.js';

export const login = async (req, res, next) => {
  try {
    const response = await authServices.login(req.body);
    if (response.success) {
      req.session.agent_id = response.data.id;
      req.session.agent_name = response.data.name;
      res.status(200).json({ message: 'Login successful', user: response.data });
    } else {
      return next(new createError(response.error.message, response.error.statusCode || 500));
    }
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const response = await authServices.register(req.body);
    if (response.success) {
      res.status(201).json({ message: 'Registration successful', user: response.data });
    } else {
      return next(new createError(response.error.message, response.error.statusCode || 500));
    }
  } catch (error) {
    next(error);
  }
};






