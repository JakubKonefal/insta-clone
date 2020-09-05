import {
  GET_PROFILE_INFO,
  UPDATE_PROFILE_IMG,
  PROFILE_IMG_LOADING,
  DELETE_PROFILE_IMG,
  TOGGLE_USER_FOLLOW
} from '../actions/types';

export default (state = { isLoading: true }, action) => {
  switch (action.type) {
    case GET_PROFILE_INFO:
      return {
        user: {
          ...action.payload.user
        },
        userPosts: [...action.payload.userPosts],
        isLoading: false,
        isFollowed: action.payload.isFollowed
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
    case TOGGLE_USER_FOLLOW:
      return {
        ...state,
        user: {
          ...action.payload.followed
        },
        isFollowed: !state.isFollowed
      };
    default:
      return state;
  }
};
