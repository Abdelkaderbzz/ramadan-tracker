'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    color?: string;
  }
>(({ className, value, color = 'orange-500', ...props }, ref) => {
  const [mounted, setMounted] = React.useState(false);
  const locale = useLocale();
  const isRtl = locale === 'ar';

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Extract color name without the shade
  const colorName = color.split('-')[0] || 'orange';

  const translateX = isRtl
    ? 100 - (mounted ? value || 0 : 0)
    : -(100 - (mounted ? value || 0 : 0));

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-gray-100',
        className,
      )}
      {...props}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <ProgressPrimitive.Indicator
        className='h-full w-full flex-1 transition-all duration-700 ease-out'
        style={{
          transform: `translateX(${translateX}%)`,
          backgroundColor: mounted ? undefined : '#e5e7eb',
          boxShadow: mounted ? `0 0 8px rgba(0, 0, 0, 0.1)` : 'none',
          background: mounted
            ? `linear-gradient(${isRtl ? '270deg' : '90deg'}, var(--${colorName}-gradient-start) 0%, var(--${colorName}-gradient-end) 100%)`
            : '#e5e7eb',
        }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
