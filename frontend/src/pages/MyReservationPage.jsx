import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Alert 
} from '@mui/material';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import reservationService from '../services/reservation.service';

const MyReservationsPage = ({ currentUser }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!currentUser) return;

    const fetchReservations = async () => {
      try {
        const response = await reservationService.getMyReservations();
        setReservations(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar las reservas');
        setLoading(false);
      }
    };

    fetchReservations();
  }, [currentUser]);

  const handleCancel = async (id) => {
    try {
      await reservationService.cancelReservation(id);
      setReservations(reservations.filter(res => res.id_reserva !== id));
      setSuccess('Reserva cancelada exitosamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cancelar la reserva');
    }
  };

  if (!currentUser) {
    return (
      <Container>
        <Alert severity="error">Debes iniciar sesión para ver tus reservas</Alert>
      </Container>
    );
  }

  if (loading) {
    return <Typography>Cargando reservas...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Reservas
      </Typography>
      
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {reservations.length === 0 ? (
        <Typography>No tienes reservas actualmente</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Espacio</TableCell>
                <TableCell>Ubicación</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id_reserva}>
                  <TableCell>{reservation.espacio.nombre}</TableCell>
                  <TableCell>{reservation.espacio.ubicacion}</TableCell>
                  <TableCell>
                    {format(new Date(reservation.fecha_reserva), 'PPP', { locale: es })}
                  </TableCell>
                  <TableCell>
                    {reservation.hora_inicio} - {reservation.hora_fin}
                  </TableCell>
                  <TableCell>{reservation.estadoReserva.nombre}</TableCell>
                  <TableCell>
                    {reservation.estado_reserva === 1 && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleCancel(reservation.id_reserva)}
                      >
                        Cancelar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default MyReservationsPage;