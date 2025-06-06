import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import MainLayout from './components/layout/MainLayout';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import page components
import Home from './pages/Home.jsx';
import AboutMarzia from './pages/AboutMarzia.jsx';
import Moments from './pages/Moments.jsx';
import Letters from './pages/Letters.jsx';
import Contact from './pages/Contact.jsx';
// import NotFoundPage from './pages/NotFoundPage.jsx'; // For later

// We need a component to wrap Routes for AnimatePresence to work with useLocation
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait"> {/* 'wait' ensures one page exits before next enters */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMarzia />} />
        <Route path="/moments" element={<Moments />} />
        <Route path="/letters" element={<Letters />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <MainLayout>
          <AnimatedRoutes />
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
