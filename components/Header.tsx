'use client';

import { useEffect, useState } from 'react';
import { Bell, Settings, LogOut, Wifi, WifiOff } from 'lucide-react';

export default function Header() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isOutOfHours, setIsOutOfHours] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  useEffect(() => {
    const checkOnline = () => {
      setIsOnline(navigator.onLine);
    };

    const updateDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
      const weekday = weekdays[now.getDay()];
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      setCurrentDate(`${year}/${month}/${day}（${weekday}）`);
      setCurrentTime(`${String(hours).padStart(2, '0')}:${minutes}`);
      setIsOutOfHours(hours >= 3 && hours < 20);
    };

    checkOnline();
    updateDateTime();

    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);
    const timer = setInterval(updateDateTime, 60000);

    return () => {
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
      clearInterval(timer);
    };
  }, []);

  const handleMouseDown = (button: string) => setPressedButton(button);
  const handleMouseUp = () => setPressedButton(null);
  const handleMouseLeave = () => { setPressedButton(null); setHoveredButton(null); };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      zIndex: 1000,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          fontSize: '22px',
          fontWeight: '800',
          color: '#1f3a5f',
          letterSpacing: '-0.02em'
        }}>
          MTO
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {['bell', 'settings', 'logout'].map((btn) => (
            <button
              key={btn}
              onMouseDown={() => handleMouseDown(btn)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setHoveredButton(btn)}
              style={{
                background: pressedButton === btn 
                  ? '#f3f4f6' 
                  : hoveredButton === btn 
                  ? '#f9fafb' 
                  : 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '10px',
                color: '#6b7280',
                transition: 'all 0.15s ease',
                transform: pressedButton === btn ? 'scale(0.9)' : 'scale(1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {btn === 'bell' && <Bell size={20} />}
              {btn === 'settings' && <Settings size={20} />}
              {btn === 'logout' && <LogOut size={20} />}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: '#f9fafb',
        fontSize: '13px',
        color: '#6b7280',
        borderTop: '1px solid #f3f4f6'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          <span style={{ fontWeight: '500' }}>{currentDate} {currentTime}</span>
          {isOutOfHours && (
            <span style={{
              color: '#d97706',
              fontWeight: '700',
              fontSize: '12px',
              background: '#fef3c7',
              padding: '3px 8px',
              borderRadius: '6px'
            }}>
              閲覧のみ
            </span>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: isOnline ? '#059669' : '#e25555',
          fontWeight: '700',
          fontSize: '12px',
          background: isOnline ? '#d1fae5' : '#fee2e2',
          padding: '4px 9px',
          borderRadius: '7px'
        }}>
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
          {isOnline ? 'オンライン' : 'オフライン'}
        </div>
      </div>
    </header>
  );
}
