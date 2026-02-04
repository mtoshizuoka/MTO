'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pending' | 'assigned' | 'completed' | 'available' | 'busy' | 'offline';
}

export default function Badge({ children, variant = 'pending' }: BadgeProps) {
  const colors: Record<string, { bg: string; text: string }> = {
    pending: { bg: '#fef3c7', text: '#d97706' },
    assigned: { bg: '#dbeafe', text: '#2563eb' },
    completed: { bg: '#d1fae5', text: '#059669' },
    available: { bg: '#d1fae5', text: '#059669' },
    busy: { bg: '#fef3c7', text: '#d97706' },
    offline: { bg: '#f3f4f6', text: '#6b7280' }
  };

  const color = colors[variant] || colors.pending;

  return (
    <span style={{
      display: 'inline-block',
      padding: '5px 11px',
      borderRadius: '9px',
      fontSize: '12px',
      fontWeight: '700',
      background: color.bg,
      color: color.text,
      letterSpacing: '0.01em'
    }}>
      {children}
    </span>
  );
}
