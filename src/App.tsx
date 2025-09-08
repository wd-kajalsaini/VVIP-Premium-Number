import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import VVIPCollection from './pages/VVIPCollection';
import HowItWorks from './pages/HowItWorks';
import Numerology from './pages/Numerology';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/*" element={
              <div className="App">
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/vvip-collection" element={<VVIPCollection />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/numerology" element={<Numerology />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
              </div>
            } />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
