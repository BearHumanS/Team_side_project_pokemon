import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/';

const axiosConfig = {
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
};

export const instanse = axios.create(axiosConfig);
