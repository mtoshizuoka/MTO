'use client';

import { useEffect, useState } from 'react';
import AppShell from '@/components/AppShell';
import { initializeData } from '@/lib/data-store';

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let initialized = false;
    if (!initialized) {
      try {
        initializeData();
      } catch (error) {
        console.error('Data initialization error:', error);
      }
      initialized = true;
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <AppShell />;
}
