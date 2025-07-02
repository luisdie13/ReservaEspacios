import axios from 'axios';

const API_URL = 'http://localhost:5000/api/spaces';

const getAllSpaces = () => {
  return axios.get(API_URL);
};

const getSpaceById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const spaceService = {
  getAllSpaces,
  getSpaceById,
};

export default spaceService;