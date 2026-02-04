'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Truck } from 'lucide-react';
import { getOrders, getDrivers, assignOrderToDriver, completeOrder } from '@/lib/data-store';
import type { Order, Driver } from '@/lib/dispatch-types';
import Card from './Card';
import Badge from './Badge';

interface DispatchScreenProps {
  onNavigate: (screen: string) => void;
}

export default function DispatchScreen({ onNavigate }: DispatchScreenProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [hoveredBackBtn, setHoveredBackBtn] = useState(false);
  const [pressedBackBtn, setPressedBackBtn] = useState(false);
  const [hoveredDriverBtn, setHoveredDriverBtn] = useState<string | null>(null);
  const [pressedDriverBtn, setPressedDriverBtn] = useState<string | null>(null);
  const [hoveredCompleteBtn, setHoveredCompleteBtn] = useState<string | null>(null);
  const [pressedCompleteBtn, setPressedCompleteBtn] = useState<string | null>(null);

  const loadData = () => {
    try {
      setOrders(getOrders());
      setDrivers(getDrivers());
    } catch (error) {
      console.error('Load data error:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAssign = (orderId: string, driverId: string) => {
    assignOrderToDriver(orderId, driverId);
    loadData();
  };

  const handleComplete = (orderId: string) => {
    completeOrder(orderId);
    loadData();
  };

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
            background: '#d1fae5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Truck size={24} color="#059669" />
          </div>
          <div style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#111827',
            letterSpacing: '-0.02em'
          }}>
            配車管理
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {orders.map((order, index) => (
            <Card key={order.id}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#6fa8dc',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '800',
                  flexShrink: 0
                }}>
                  {index + 1}
                </div>
                <div style={{ flex: 1 }}>
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
                      {order.storeName}
                    </span>
                    <Badge variant={order.status}>
                      {order.status === 'pending' ? '未割当' : 
                       order.status === 'assigned' ? '配車済' : '完了'}
                    </Badge>
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    marginBottom: '3px',
                    fontWeight: '500'
                  }}>
                    集荷: {order.pickupTime}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    marginBottom: '10px',
                    fontWeight: '500'
                  }}>
                    配送先: {order.deliveryAddress}
                  </div>
                  {order.driverName && (
                    <div style={{
                      fontSize: '13px',
                      color: '#2563eb',
                      fontWeight: '700',
                      marginBottom: '10px',
                      background: '#eff6ff',
                      padding: '5px 10px',
                      borderRadius: '8px',
                      display: 'inline-block'
                    }}>
                      担当: {order.driverName}
                    </div>
                  )}
                  {order.status === 'pending' && (
                    <div style={{
                      display: 'flex',
                      gap: '6px',
                      flexWrap: 'wrap'
                    }}>
                      {drivers.filter(d => d.status === 'available').map(driver => (
                        <button
                          key={driver.id}
                          onClick={() => handleAssign(order.id, driver.id)}
                          onMouseEnter={() => setHoveredDriverBtn(driver.id)}
                          onMouseLeave={() => { setHoveredDriverBtn(null); setPressedDriverBtn(null); }}
                          onMouseDown={() => setPressedDriverBtn(driver.id)}
                          onMouseUp={() => setPressedDriverBtn(null)}
                          style={{
                            padding: '7px 14px',
                            background: pressedDriverBtn === driver.id 
                              ? '#bfdbfe' 
                              : hoveredDriverBtn === driver.id 
                              ? '#dbeafe' 
                              : '#eff6ff',
                            color: '#2563eb',
                            border: '1px solid',
                            borderColor: pressedDriverBtn === driver.id || hoveredDriverBtn === driver.id 
                              ? '#93c5fd' 
                              : '#dbeafe',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transform: pressedDriverBtn === driver.id ? 'scale(0.95)' : 'scale(1)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {driver.name}
                        </button>
                      ))}
                    </div>
                  )}
                  {order.status === 'assigned' && (
                    <button
                      onClick={() => handleComplete(order.id)}
                      onMouseEnter={() => setHoveredCompleteBtn(order.id)}
                      onMouseLeave={() => { setHoveredCompleteBtn(null); setPressedCompleteBtn(null); }}
                      onMouseDown={() => setPressedCompleteBtn(order.id)}
                      onMouseUp={() => setPressedCompleteBtn(null)}
                      style={{
                        padding: '9px 18px',
                        background: pressedCompleteBtn === order.id 
                          ? '#4f9e6a' 
                          : hoveredCompleteBtn === order.id 
                          ? '#6fbf84' 
                          : '#63b37b',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '11px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: pressedCompleteBtn === order.id 
                          ? '0 1px 3px rgba(0,0,0,0.15)' 
                          : hoveredCompleteBtn === order.id 
                          ? '0 3px 8px rgba(99,179,123,0.35)' 
                          : '0 2px 5px rgba(99,179,123,0.25)',
                        transform: pressedCompleteBtn === order.id ? 'scale(0.96)' : 'scale(1)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      完了
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
