// src/utils/request.js
import axios from 'axios';

const request = axios.create({
  baseURL: 'http://27.71.17.99:9090',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;
