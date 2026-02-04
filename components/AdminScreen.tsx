'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import { getStats } from '@/lib/data-store';
import type { Stats } from '@/lib/dispatch-types';

interface AdminScreenProps {
  onNavigate: (screen: string) => void;
}

export default function AdminScreen({ onNavigate }: AdminScreenProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [hoveredBackBtn, setHoveredBackBtn] = useState(false);
  const [pressedBackBtn, setPressedBackBtn] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
      const weekday = weekdays[now.getDay()];
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${year}/${month}/${day}（${weekday}） ${hours}:${minutes}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      const data = getStats();
      setStats(data);
    } catch (error) {
      console.error('Stats load error:', error);
      setStats({
        totalOrders: 0,
        completedOrders: 0,
        activeDrivers: 0,
        totalStores: 0
      });
    }
  }, []);

  if (!stats) {
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
        </div>
      </div>
    );
  }

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
            background: '#e0e7ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Settings size={24} color="#6366f1" />
          </div>
          <div>
            <div style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '2px',
              letterSpacing: '-0.02em'
            }}>
              管理
            </div>
            {currentTime && (
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                {currentTime}
              </div>
            )}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          marginBottom: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              marginBottom: '6px',
              fontWeight: '600'
            }}>
              総注文数
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#111827',
              letterSpacing: '-0.03em'
            }}>
              {stats.totalOrders}
            </div>
          </div>

          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              marginBottom: '6px',
              fontWeight: '600'
            }}>
              完了済み
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#059669',
              letterSpacing: '-0.03em'
            }}>
              {stats.completedOrders}
            </div>
          </div>

          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              marginBottom: '6px',
              fontWeight: '600'
            }}>
              稼働中ドライバー
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#2563eb',
              letterSpacing: '-0.03em'
            }}>
              {stats.activeDrivers}
            </div>
          </div>

          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              marginBottom: '6px',
              fontWeight: '600'
            }}>
              登録店舗数
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#d97706',
              letterSpacing: '-0.03em'
            }}>
              {stats.totalStores}
            </div>
          </div>
        </div>

        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '18px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            fontSize: '17px',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '14px'
          }}>
            システム情報
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '10px',
              borderBottom: '1px solid #f3f4f6'
            }}>
              <span style={{
                fontSize: '14px',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                データストレージ
              </span>
              <span style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#111827'
              }}>
                localStorage
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '10px',
              borderBottom: '1px solid #f3f4f6'
            }}>
              <span style={{
                fontSize: '14px',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                業務時間
              </span>
              <span style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#111827'
              }}>
                20:00 〜 翌03:00
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span style={{
                fontSize: '14px',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                バージョン
              </span>
              <span style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#111827'
              }}>
                1.0.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
