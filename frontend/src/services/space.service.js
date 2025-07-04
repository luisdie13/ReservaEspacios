import axios from 'axios';

// Get the API base URL from environment variables
// This should point to your backend's base URL (e.g., http://localhost:3000/api)
const API_BASE_URL = import.meta.env.VITE_API_URL;

// The specific path for space-related endpoints
// This will combine with API_BASE_URL to form http://localhost:3000/api/spaces
const SPACES_API_PATH = `${API_BASE_URL}/spaces`;

const getAllSpaces = () => {
  // Use SPACES_API_PATH for the base URL for all spaces
  return axios.get(SPACES_API_PATH);
};

const getSpaceById = (id) => {
  // Use SPACES_API_PATH for specific space ID
  return axios.get(`${SPACES_API_PATH}/${id}`);
};

const spaceService = {
  getAllSpaces,
  getSpaceById,
};

export default spaceService;
