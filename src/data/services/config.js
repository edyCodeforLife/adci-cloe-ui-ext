import axios from 'axios';

export const DataService = axios.create({ baseURL: process.env.REACT_APP_API_URL });