import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Altere a porta conforme necessário
});

export default api;
