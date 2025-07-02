import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SpacesPage from './pages/SpacesPage';
import MyReservationsPage from './pages/MyReservationsPage';
import ReservationForm from './components/ReservationForm';
import authService from './services/auth.service';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    return <Navigate to="/login" />;
  };

  return (
    <>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<SpacesPage />} />
            <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/spaces" element={<SpacesPage />} />
            <Route path="/reservations" element={<MyReservationsPage currentUser={currentUser} />} />
            <Route path="/reserve/:spaceId" element={<ReservationForm currentUser={currentUser} />} />
          </Routes>
        </Box>
      </Container>
    </>
  );
}

export default App;