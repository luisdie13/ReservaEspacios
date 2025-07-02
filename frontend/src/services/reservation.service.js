import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reservations';

const getMyReservations = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return axios.get(`${API_URL}/myreservations`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
};

const createReservation = (id_espacio, fecha_reserva, hora_inicio, hora_fin) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return axios.post(
    API_URL,
    { id_espacio, fecha_reserva, hora_inicio, hora_fin },
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
};

const cancelReservation = (id) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return axios.put(
    `${API_URL}/${id}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
};

const reservationService = {
  getMyReservations,
  createReservation,
  cancelReservation,
};

export default reservationService;