'use client';

import { ChevronRight, LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface NavCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick: () => void;
  iconBgColor: string;
  iconColor: string;
}

export default function NavCard({
  icon: Icon,
  title,
  subtitle,
  onClick,
  iconBgColor,
  iconColor
}: NavCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => { setIsPressed(false); setIsHovered(false); }}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        width: '100%',
        background: '#ffffff',
        border: 'none',
        borderRadius: '16px',
        padding: '18px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        cursor: 'pointer',
        boxShadow: isPressed 
          ? '0 1px 2px rgba(0,0,0,0.1)' 
          : isHovered 
          ? '0 4px 12px rgba(0,0,0,0.08)' 
          : '0 2px 6px rgba(0,0,0,0.05)',
        textAlign: 'left',
        transform: isPressed ? 'scale(0.98)' : isHovered ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'all 0.15s ease',
        outline: 'none'
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: iconBgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transform: isPressed ? 'scale(0.9)' : 'scale(1)',
          transition: 'transform 0.15s ease'
        }}
      >
        <Icon size={26} color={iconColor} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '17px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '3px'
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '13px',
          color: '#6b7280'
        }}>
          {subtitle}
        </div>
      </div>
      <ChevronRight 
        size={20} 
        color={isPressed ? '#9ca3af' : '#d1d5db'} 
        style={{ 
          transition: 'color 0.15s ease',
          transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
          transitionProperty: 'color, transform',
          transitionDuration: '0.15s'
        }}
      />
    </button>
  );
}
