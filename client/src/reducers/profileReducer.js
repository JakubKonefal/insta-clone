import {
  GET_PROFILE_INFO,
  PROFILE_LOADING,
  UPDATE_PROFILE_IMG,
  PROFILE_IMG_LOADING,
  DELETE_PROFILE_IMG,
  TOGGLE_USER_FOLLOW,
  GET_USER_PHOTO,
  DELETE_POST,
  DELETE_POST_SUCCESS
} from '../actions/types';

const updatePostsOnDelete = (userPosts, deletedPostId) => {
  const updatedPostsArr = [...userPosts].filter(
    post => post._id !== deletedPostId
  );
  return updatedPostsArr;
};

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
    case GET_USER_PHOTO:
      return {
        ...state,
        isLoading: false,
        photo: action.payload
      };
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_PROFILE_IMG:
      return {
        ...state,
        user: {
          ...action.payload
        },
        isLoading: false,
        isImgLoading: false
      };
    case DELETE_PROFILE_IMG:
      return {
        ...state,
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
    case DELETE_POST:
      return {
        ...state,
        deletedPost: {
          isPending: true,
          success: false
        }
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        userPosts: updatePostsOnDelete(state.userPosts, action.payload),
        deletedPost: {
          isPending: false,
          success: true
        }
      };
    default:
      return state;
  }
};
