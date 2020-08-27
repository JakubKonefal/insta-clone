import {
  ADD_POST,
  ADD_POST_SUCCESS,
  GET_ALL_POSTS,
  ALL_POSTS_LOADING
} from '../actions/types';

const initialState = {
  allPosts: [],
  allPostsLoading: true,
  createdPost: {}
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        createdPost: {
          isSending: true,
          success: false
        }
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        createdPost: {
          isSending: false,
          success: true
        }
      };
    case GET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload,
        allPostsLoading: false
      };
    default:
      return state;
  }
};

export default postReducer;
