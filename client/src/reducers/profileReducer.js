import { GET_PROFILE_INFO } from '../actions/types';

export default (state = { isLoading: true }, action) => {
  switch (action.type) {
    case GET_PROFILE_INFO:
      return {
        ...action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
