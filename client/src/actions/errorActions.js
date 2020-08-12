import { REGISTER_FAIL, CLEAR_ERRORS } from './types';

export const sendError = error => ({
  type: REGISTER_FAIL,
  payload: error
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});
