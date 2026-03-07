'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // تجنب hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant='outline' size='icon' className='w-10 h-10' disabled>
        <Sun className='h-4 w-4' />
      </Button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <Button
      variant='outline'
      size='icon'
      className='w-10 h-10'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className='h-4 w-4 text-yellow-500' />
      ) : (
        <Moon className='h-4 w-4 text-slate-700' />
      )}
    </Button>
  );
}
