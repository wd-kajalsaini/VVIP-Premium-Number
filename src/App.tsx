import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import VVIPCollection from './pages/VVIPCollection';
import HowItWorks from './pages/HowItWorks';
import Numerology from './pages/Numerology';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
