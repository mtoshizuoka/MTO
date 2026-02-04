'use client';

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '16px',
      padding: '16px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      transition: 'box-shadow 0.2s ease'
    }}>
      {children}
    </div>
  );
}
