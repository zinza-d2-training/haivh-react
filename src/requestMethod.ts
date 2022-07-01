import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const user = JSON.parse(localStorage.getItem('persist:root') || '{}')?.user;
const userParse = user && JSON.parse(user).value;
const ACCESS_TOKEN = userParse?.access_token;

export const axiosInstance = axios.create({
  baseURL: BASE_URL
});

export const axiosInstanceWithToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
});
