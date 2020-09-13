import axios from 'axios';
import uniqid from 'uniqid';
import {
  ADD_POST,
  ADD_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  GET_ERRORS,
  CLEAR_ERRORS,
  ALL_POSTS_LOADING,
  GET_ALL_POSTS,
  LIKE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_FOLLOWED_USERS_POSTS
} from './types';
import { storage } from '../config/firebase';

export const getAllPosts = token => dispatch => {
  dispatch({ type: ALL_POSTS_LOADING });
  axios
    .get('/posts', {
      headers: {
        token
      }
    })
    .then(res => {
      dispatch({ type: GET_ALL_POSTS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};

export const getFollowedUsersPosts = token => dispatch => {
  dispatch({ type: ALL_POSTS_LOADING });
  axios
    .get('/posts/followed', { headers: { token } })
    .then(res => {
      dispatch({ type: GET_FOLLOWED_USERS_POSTS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};

export const addPost = (post, image, token) => async dispatch => {
  dispatch({ type: ADD_POST });

  const {
    data: { _id }
  } = await axios.post(
    '/post',
    { verifyToken: true },
    {
      headers: {
        token
      }
    }
  );

  let imageUrl = '';
  const postId = uniqid();

  if (image) {
    const { ref } = await storage.ref(`/posts/${_id}`).child(postId).put(image);
    imageUrl = await ref.getDownloadURL();
  }

  const newPost = {
    ...post,
    image: imageUrl,
    _id: postId
  };

  axios
    .post(
      '/post',

      newPost,
      {
        headers: {
          token
        }
      }
    )
    .then(() => {
      dispatch({ type: ADD_POST_SUCCESS });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};

export const deletePost = (token, postId) => dispatch => {
  dispatch({ type: DELETE_POST });
  axios
    .delete('/post', { headers: { token, postId } })
    .then(res => {
      dispatch({ type: DELETE_POST_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};

export const addComment = (token, comment) => dispatch => {
  axios
    .post(
      '/post/comment',
      { comment },
      {
        headers: {
          token
        }
      }
    )
    .then(res => {
      dispatch({ type: ADD_COMMENT, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};

export const deleteComment = (token, commentId, postId) => dispatch => {
  axios
    .delete('/post/comment', { headers: { token, commentId, postId } })
    .then(() => {
      dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};

export const likePost = (token, postId) => dispatch => {
  axios
    .post(
      '/post/like',
      { postId },
      {
        headers: {
          token
        }
      }
    )
    .then(res => {
      dispatch({ type: LIKE_POST, payload: { uid: res.data, postId } });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};
