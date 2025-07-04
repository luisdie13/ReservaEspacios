    import axios from 'axios';

    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const RESERVATIONS_API_PATH = `${API_BASE_URL}/reservations`;

    const getMyReservations = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      return axios.get(`${RESERVATIONS_API_PATH}/myreservations`, {
        headers: {
          Authorization: `Bearer ${user?.token}`, // <--- CHANGED TO user?.token
        },
      });
    };

    const createReservation = (id_espacio, fecha_reserva, hora_inicio, hora_fin) => {
      const user = JSON.parse(localStorage.getItem('user'));
      return axios.post(
        RESERVATIONS_API_PATH,
        { id_espacio, fecha_reserva, hora_inicio, hora_fin },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, // <--- CHANGED TO user?.token
          },
        }
      );
    };

    const cancelReservation = (id) => {
      const user = JSON.parse(localStorage.getItem('user'));
      return axios.put(
        `${RESERVATIONS_API_PATH}/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`, // <--- CHANGED TO user?.token
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