import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Box } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SpacesPage from './pages/SpacesPage.jsx';
// Ensure this file exists at src/pages/MyReservationsPage.jsx (or .js) with correct casing
import MyReservationsPage from './pages/MyReservationPage.jsx';
import ReservationForm from './components/ReservationForm.jsx';
import authService from './services/auth.service.js';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate("/login"); // Use navigate for programmatic redirection
  };

  return (
    <>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ minHeight: '80vh' }}>
          <Routes>
            {/* Redirect to /spaces if logged in and trying to access root */}
            <Route path="/" element={currentUser ? <Navigate to="/spaces" /> : <LoginPage setCurrentUser={setCurrentUser} />} />
            <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/spaces" element={<SpacesPage />} />
            {/* Protect /reservations route - redirect if no currentUser */}
            <Route
              path="/reservations"
              element={currentUser ? <MyReservationsPage currentUser={currentUser} /> : <Navigate to="/login" />}
            />
            {/* Protect /reserve/:spaceId route - redirect if no currentUser */}
            <Route
              path="/reserve/:spaceId"
              element={currentUser ? <ReservationForm currentUser={currentUser} /> : <Navigate to="/login" />}
            />
          </Routes>
        </Box>
      </Container>
    </>
  );
}

export default App;