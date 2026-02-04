'use client';

import { useState } from 'react';
import Header from './Header';
import MainScreen from './MainScreen';
import DispatchScreen from './DispatchScreen';
import StoreScreen from './StoreScreen';
import DriverScreen from './DriverScreen';
import AdminScreen from './AdminScreen';

export default function AppShell() {
  const [currentScreen, setCurrentScreen] = useState('main');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dispatch':
        return <DispatchScreen onNavigate={handleNavigate} />;
      case 'store':
        return <StoreScreen onNavigate={handleNavigate} />;
      case 'driver':
        return <DriverScreen onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminScreen onNavigate={handleNavigate} />;
      default:
        return <MainScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <Header />
      {renderScreen()}
    </>
  );
}
