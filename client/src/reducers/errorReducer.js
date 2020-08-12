import { REGISTER_FAIL, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  error: {
    message: '',
    path: []
  },
  status: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_FAIL:
      return {
        error: action.payload.data,
        status: action.payload.status
      };
    case CLEAR_ERRORS:
      return {
        error: {
          message: '',
          path: []
        },
        status: ''
      };
    default:
      return state;
  }
};
