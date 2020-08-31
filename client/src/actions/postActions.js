import axios from 'axios';
import uniqid from 'uniqid';
import {
  ADD_POST,
  ADD_POST_SUCCESS,
  GET_ERRORS,
  CLEAR_ERRORS,
  ALL_POSTS_LOADING,
  GET_ALL_POSTS
} from './types';
import { storage } from '../config/firebase';

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
    .then(res => {
      dispatch({ type: ADD_POST_SUCCESS });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};

export const getAllPosts = token => async dispatch => {
  dispatch({ type: ALL_POSTS_LOADING });
  axios
    .get('/home', {
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
