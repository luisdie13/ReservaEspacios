import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Alert 
} from '@mui/material';
import spaceService from '../services/space.service';

const SpacesPage = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await spaceService.getAllSpaces();
        setSpaces(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar los espacios');
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  if (loading) {
    return <Typography>Cargando espacios...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Espacios Disponibles
      </Typography>
      
      <Grid container spacing={3}>
        {spaces.map((space) => (
          <Grid item xs={12} sm={6} md={4} key={space.id_espacio}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {space.nombre}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {space.tipoEspacio?.nombre}
                </Typography>
                <Typography variant="body2">
                  Ubicación: {space.ubicacion}
                  <br />
                  Capacidad: {space.capacidad}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    to={`/reserve/${space.id_espacio}`}
                  >
                    Reservar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SpacesPage;