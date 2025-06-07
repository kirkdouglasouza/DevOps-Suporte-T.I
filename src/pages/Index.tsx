
import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import SchedulingForm from '@/components/SchedulingForm';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <SchedulingForm onLogout={handleLogout} />
      )}
    </>
  );
};

export default Index;
