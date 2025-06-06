import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import MainLayout from './components/layout/MainLayout';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import page components
import Home from './pages/Home.jsx';
import AboutMarzia from './pages/AboutMarzia.jsx';
import Moments from './pages/Moments.jsx';
import Letters from './pages/Letters.jsx';
import BirthdayWishes from './pages/BirthdayWishes.jsx'; // New Birthday Page

// Birthday feature imports
import { isTodayMarziasBirthdayInBangladesh } from './utils/birthdayCheck';
import BirthdayPopup from './components/common/BirthdayPopup.jsx';

const AnimatedRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate(); // For programmatic navigation

  const [isBirthday, setIsBirthday] = useState(false);
  const [showBirthdayPopup, setShowBirthdayPopup] = useState(false);
  const [birthdayRedirected, setBirthdayRedirected] = useState(sessionStorage.getItem('birthdayRedirected') === 'true'); // Persist across refresh

  useEffect(() => {
    const todayIsBirthday = isTodayMarziasBirthdayInBangladesh();
    setIsBirthday(todayIsBirthday);

    if (todayIsBirthday && !birthdayRedirected) {
      // Only show popup if not already on birthday page
      if (location.pathname !== '/birthday-wishes') {
        setShowBirthdayPopup(true);
      } else {
        // If already on birthday page (e.g. direct link access on birthday), mark as redirected to prevent popup loop
        sessionStorage.setItem('birthdayRedirected', 'true');
        setBirthdayRedirected(true);
      }
    } else if (!todayIsBirthday && birthdayRedirected) {
      // Reset redirect status if it's no longer birthday (e.g., day changed)
      sessionStorage.removeItem('birthdayRedirected');
      setBirthdayRedirected(false);
    }
  }, [location.pathname, birthdayRedirected]);

  const handlePopupShownAndRedirect = () => {
    setShowBirthdayPopup(false);
    if (location.pathname !== '/birthday-wishes') {
      navigate('/birthday-wishes');
    }
    sessionStorage.setItem('birthdayRedirected', 'true'); // Persist redirect status
    setBirthdayRedirected(true);
  };

  if (isBirthday && showBirthdayPopup && location.pathname !== '/birthday-wishes') {
    return <BirthdayPopup onShown={handlePopupShownAndRedirect} />;
  }

  if (isBirthday && location.pathname === '/birthday-wishes') {
    return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/birthday-wishes" element={<BirthdayWishes />} />
          {/* Fallback for any other route on birthday IF already redirected to birthday page once.
              This ensures user STAYS on birthday page IF it's birthday and they've been sent there.
              However, this might be too restrictive. For now, let's assume direct navigation to /birthday-wishes is fine.
          */}
        </Routes>
      </AnimatePresence>
    );
  }

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMarzia />} />
          <Route path="/moments" element={<Moments />} />
          <Route path="/letters" element={<Letters />} />
          {/* Conditionally add birthday route if it's her birthday, so it's accessible
              even if user navigates away after initial popup/redirect.
              The popup won't show again due to 'birthdayRedirected' state.
          */}
          {isBirthday && <Route path="/birthday-wishes" element={<BirthdayWishes />} />}
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
