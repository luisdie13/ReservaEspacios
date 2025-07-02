import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Alert 
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, addHours } from 'date-fns';
import es from 'date-fns/locale/es';
import spaceService from '../services/space.service';
import reservationService from '../services/reservation.service';

const ReservationForm = ({ currentUser }) => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }

    const fetchSpace = async () => {
      try {
        const response = await spaceService.getSpaceById(spaceId);
        setSpace(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar el espacio');
      }
    };

    fetchSpace();
  }, [spaceId, currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      await reservationService.createReservation(
        spaceId,
        formattedDate,
        startTime,
        endTime
      );
      setSuccess('Reserva creada exitosamente!');
      setTimeout(() => {
        navigate('/reservations');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la reserva');
    }
  };

  if (!space) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Reservar: {space.nombre}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Ubicación: {space.ubicacion} | Capacidad: {space.capacidad}
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DatePicker
            label="Fecha de reserva"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            minDate={new Date()}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" required />
            )}
          />
        </LocalizationProvider>

        <FormControl fullWidth margin="normal">
          <InputLabel id="start-time-label">Hora de inicio</InputLabel>
          <Select
            labelId="start-time-label"
            value={startTime}
            label="Hora de inicio"
            onChange={(e) => setStartTime(e.target.value)}
            required
          >
            {Array.from({ length: 12 }, (_, i) => {
              const hour = i + 8;
              return (
                <MenuItem key={`start-${hour}`} value={`${hour}:00`}>
                  {hour}:00
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="end-time-label">Hora de fin</InputLabel>
          <Select
            labelId="end-time-label"
            value={endTime}
            label="Hora de fin"
            onChange={(e) => setEndTime(e.target.value)}
            required
          >
            {Array.from({ length: 12 }, (_, i) => {
              const hour = i + 9;
              return (
                <MenuItem key={`end-${hour}`} value={`${hour}:00`}>
                  {hour}:00
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Confirmar Reserva
        </Button>
      </Box>
    </Container>
  );
};

export default ReservationForm;