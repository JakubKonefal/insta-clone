import axios from 'axios';
import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';

export const register = ({
  firstName,
  lastName,
  email,
  password
}) => dispatch => {
  console.log('REGISTER FUNC');
  console.log(firstName, lastName, email, password);
  const newUser = { firstName, lastName, email, password };
  console.log(newUser);
  axios
    .post('http://localhost:5000/signup', newUser)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: REGISTER_FAIL
      });
    });
};
