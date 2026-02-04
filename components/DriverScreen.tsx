'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, UserCircle } from 'lucide-react';
import { getDrivers, getOrdersByDriver } from '@/lib/data-store';
import type { Driver } from '@/lib/dispatch-types';
import Card from './Card';
import Badge from './Badge';

interface DriverScreenProps {
  onNavigate: (screen: string) => void;
}

export default function DriverScreen({ onNavigate }: DriverScreenProps) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [hoveredBackBtn, setHoveredBackBtn] = useState(false);
  const [pressedBackBtn, setPressedBackBtn] = useState(false);

  useEffect(() => {
    try {
      setDrivers(getDrivers());
    } catch (error) {
      console.error('Load drivers error:', error);
    }
  }, []);

  return (
    <div style={{
      padding: '16px',
      minHeight: 'calc(100vh - 100px)'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <button
          onClick={() => onNavigate('main')}
          onMouseEnter={() => setHoveredBackBtn(true)}
          onMouseLeave={() => { setHoveredBackBtn(false); setPressedBackBtn(false); }}
          onMouseDown={() => setPressedBackBtn(true)}
          onMouseUp={() => setPressedBackBtn(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 18px',
            background: pressedBackBtn ? '#5a8fc7' : hoveredBackBtn ? '#7bb4e6' : '#6fa8dc',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            marginBottom: '16px',
            boxShadow: pressedBackBtn 
              ? '0 1px 3px rgba(0,0,0,0.15)' 
              : hoveredBackBtn 
              ? '0 3px 8px rgba(111,168,220,0.35)' 
              : '0 2px 5px rgba(111,168,220,0.25)',
            transform: pressedBackBtn ? 'scale(0.96)' : 'scale(1)',
            transition: 'all 0.15s ease'
          }}
        >
          <ArrowLeft size={18} />
          戻る
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#dbeafe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <UserCircle size={24} color="#2563eb" />
          </div>
          <div style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#111827',
            letterSpacing: '-0.02em'
          }}>
            ドライバー
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {drivers.map(driver => {
            const orders = getOrdersByDriver(driver.id);
            return (
              <Card key={driver.id}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontSize: '17px',
                    fontWeight: '800',
                    color: '#111827'
                  }}>
                    {driver.name}
                  </span>
                  <Badge variant={driver.status}>
                    {driver.status === 'available' ? '待機中' :
                     driver.status === 'busy' ? '配送中' : 'オフライン'}
                  </Badge>
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  現在地: {driver.currentLocation}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#2563eb',
                  fontWeight: '700',
                  background: '#eff6ff',
                  padding: '5px 10px',
                  borderRadius: '8px',
                  display: 'inline-block'
                }}>
                  担当中: {orders.filter(o => o.status === 'assigned').length}件
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
