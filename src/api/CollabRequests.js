import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8800' });

export const getCollab = (collabId) => API.get(`/api/collab/${collabId}`);
