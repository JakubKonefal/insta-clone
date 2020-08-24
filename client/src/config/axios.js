import axios from 'axios';

export const axiosLocal = axios.create({
  baseURL: 'http://localhost:5000'
});
