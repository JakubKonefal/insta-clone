import { ADD_POST, ADD_POST_SUCCESS } from '../actions/types';

const postReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        isLoading: true
      };
    case ADD_POST_SUCCESS:
      return {
        isLoading: false,
        post: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
