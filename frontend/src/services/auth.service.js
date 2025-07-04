import axios from 'axios';

// Get the API URL from environment variables
// Vite exposes client-side environment variables via import.meta.env
const API_BASE_URL = import.meta.env.VITE_API_URL;

class AuthService {
  async register(nombre, apellido, email, password, telefono, userType) {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      nombre,
      apellido,
      email,
      password,
      telefono,
      tipo_usuario: userType
    });
    // Now checking for 'token' as per your backend response
    if (response.data.token) { // <--- CHANGED from accessToken to token
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  async login(email, password) {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    // Now checking for 'token' as per your backend response
    if (response.data.token) { // <--- CHANGED from accessToken to token
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    // When retrieving, the stored object will have a 'token' property
    // So, when you access user?.token in other services, it will now be correct.
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();