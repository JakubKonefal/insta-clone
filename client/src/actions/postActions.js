import uniqid from 'uniqid';
import { ADD_POST, ADD_POST_SUCCESS, GET_ERRORS, CLEAR_ERRORS } from './types';
import { axiosLocal } from '../config/axios';
import { storage } from '../config/firebase';

export const addPost = (description, image, token) => async dispatch => {
  dispatch({ type: ADD_POST });

  const {
    data: { _id }
  } = await axiosLocal.post(
    '/post',
    { verifyToken: true },
    {
      headers: {
        token
      }
    }
  );

  const postId = uniqid();
  const uploadTask =
    (await image) && storage.ref(`/posts/${_id}`).child(postId).put(image);
  const imageUrl = (await image) && uploadTask.ref.getDownloadURL();

  axiosLocal
    .post(
      '/post',
      {
        description,
        image: imageUrl,
        _id: postId
      },
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
