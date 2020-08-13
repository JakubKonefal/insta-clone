import { GET_ERRORS, CLEAR_ERRORS } from './types';

export const getError = error => ({
  type: GET_ERRORS,
  payload: error
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});
