import {
  ADD_POST,
  ADD_POST_SUCCESS,
  GET_ALL_POSTS,
  LIKE_POST,
  ADD_COMMENT,
  GET_FOLLOWED_USERS_POSTS,
  ALL_POSTS_LOADING
} from '../actions/types';

const initialState = {
  allPosts: [],
  allPostsLoading: false,
  createdPost: {
    isSending: false,
    success: false
  }
};

const updateLikedPost = (allPosts, uid, postId) => {
  const likedPost = allPosts.find(post => post._id === postId);
  const indexOfLikedPost = allPosts.findIndex(post => post._id === postId);
  const alreadyLiked = likedPost.likes.includes(uid);

  const updatedPost = alreadyLiked
    ? { ...likedPost, likes: likedPost.likes.filter(id => id !== uid) }
    : { ...likedPost, likes: [...likedPost.likes, uid] };
  const allPostsUpdated = [...allPosts];
  allPostsUpdated[indexOfLikedPost] = updatedPost;

  return allPostsUpdated;
};

const updatePostWithNewComment = (allPosts, updatedPost) => {
  const indexOfUpdatedPost = allPosts.findIndex(
    post => post._id === updatedPost._id
  );

  const updatedPostsArr = [...allPosts];
  updatedPostsArr[indexOfUpdatedPost].comments = updatedPost.comments;

  return updatedPostsArr;
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
    case GET_FOLLOWED_USERS_POSTS:
      return {
        ...state,
        allPosts: [...action.payload],
        allPostsLoading: false
      };
    case ALL_POSTS_LOADING:
      return {
        ...state,
        allPostsLoading: true
      };
    case LIKE_POST:
      return {
        ...state,
        allPosts: updateLikedPost(
          state.allPosts,
          action.payload.uid,
          action.payload.postId
        )
      };
    case ADD_COMMENT:
      return {
        ...state,
        allPosts: updatePostWithNewComment(state.allPosts, action.payload)
      };

    default:
      return state;
  }
};

export default postReducer;
