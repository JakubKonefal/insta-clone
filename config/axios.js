const axios = require('axios').default;

const axiosCloudinaryInstance = axios.create({
  baseURL: 'https://api.cloudinary.com/v1_1/cloud0'
});
module.exports = axiosCloudinaryInstance;
