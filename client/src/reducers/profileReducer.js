import {
  GET_PROFILE_INFO,
  UPDATE_PROFILE_IMG,
  PROFILE_IMG_LOADING,
  DELETE_PROFILE_IMG
} from '../actions/types';

export default (state = { isLoading: true }, action) => {
  switch (action.type) {
    case GET_PROFILE_INFO:
      return {
        user: {
          ...action.payload
        },
        isLoading: false
      };
    case UPDATE_PROFILE_IMG:
      return {
        user: {
          ...action.payload
        },
        isLoading: false,
        isImgLoading: false
      };
    case DELETE_PROFILE_IMG:
      return {
        user: {
          ...action.payload
        },
        isLoading: false,
        isImgLoading: false
      };
    case PROFILE_IMG_LOADING:
      return {
        ...state,
        isImgLoading: true
      };
    default:
      return state;
  }
};
