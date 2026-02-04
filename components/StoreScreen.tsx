'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Store } from 'lucide-react';
import { getStores, getOrdersByStore } from '@/lib/data-store';
import type { Store as StoreType } from '@/lib/dispatch-types';
import Card from './Card';

interface StoreScreenProps {
  onNavigate: (screen: string) => void;
}

export default function StoreScreen({ onNavigate }: StoreScreenProps) {
  const [stores, setStores] = useState<StoreType[]>([]);
  const [hoveredBackBtn, setHoveredBackBtn] = useState(false);
  const [pressedBackBtn, setPressedBackBtn] = useState(false);

  useEffect(() => {
    try {
      setStores(getStores());
    } catch (error) {
      console.error('Load stores error:', error);
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
            background: '#fef3c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Store size={24} color="#d97706" />
          </div>
          <div style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#111827',
            letterSpacing: '-0.02em'
          }}>
            店舗
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {stores.map(store => {
            const orders = getOrdersByStore(store.id);
            return (
              <Card key={store.id}>
                <div style={{
                  fontSize: '17px',
                  fontWeight: '800',
                  color: '#111827',
                  marginBottom: '8px'
                }}>
                  {store.name}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  marginBottom: '3px',
                  fontWeight: '500'
                }}>
                  {store.address}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>
                  {store.phone}
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
                  配送待ち: {orders.filter(o => o.status !== 'completed').length}件
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
