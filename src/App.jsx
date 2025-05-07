import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LoginPage from './component/LoginPage';
import SignUp from './component/SignUp';
import NavBar from './component/NavBar';
import HomePage from './component/HomePage';

const AppContent = () => {
  const location = useLocation();
  const authPages = ['/loginPage', '/SignUp'];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <div
      className={`${isAuthPage ? 'bg-cover bg-no-repeat min-h-screen' : ''}`}
      style={isAuthPage ? { backgroundImage: "url(/bgHouse.jpg)" } : {}}
    >
      {!isAuthPage && <NavBar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
