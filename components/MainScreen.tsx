'use client';

import { Truck, Store, UserCircle, Settings } from 'lucide-react';
import NavCard from './NavCard';

interface MainScreenProps {
  onNavigate: (screen: string) => void;
}

export default function MainScreen({ onNavigate }: MainScreenProps) {
  return (
    <div style={{
      padding: '16px',
      minHeight: 'calc(100vh - 100px)'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <NavCard
          icon={Truck}
          title="配車管理"
          subtitle="配送状況の確認と配車"
          onClick={() => onNavigate('dispatch')}
          iconBgColor="#d1fae5"
          iconColor="#059669"
        />
        <NavCard
          icon={UserCircle}
          title="ドライバー"
          subtitle="ドライバーの状態管理"
          onClick={() => onNavigate('driver')}
          iconBgColor="#dbeafe"
          iconColor="#2563eb"
        />
        <NavCard
          icon={Store}
          title="店舗"
          subtitle="店舗情報の確認"
          onClick={() => onNavigate('store')}
          iconBgColor="#fef3c7"
          iconColor="#d97706"
        />
        <NavCard
          icon={Settings}
          title="管理"
          subtitle="システム設定"
          onClick={() => onNavigate('admin')}
          iconBgColor="#e0e7ff"
          iconColor="#6366f1"
        />
      </div>
    </div>
  );
}
