'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LanguageSwitcher() {
  const t = useTranslations('Index');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (value: string) => {
    const nextLocale = value;
    startTransition(() => {
      // Construct the new path by replacing the locale segment
      // This is a simplified approach assuming the locale is always the first segment
      // A more robust way would depend on how next-intl is configured to strip the locale

      const segments = pathname.split('/');
      segments[1] = nextLocale;
      const newPath = segments.join('/');

      router.replace(newPath);
    });
  };

  return (
    <Select value={locale} onValueChange={onSelectChange} disabled={isPending}>
      <SelectTrigger className='w-[140px]'>
        <SelectValue placeholder={t('select_language')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='ar'>العربية</SelectItem>
        <SelectItem value='en'>English</SelectItem>
        <SelectItem value='fr'>Français</SelectItem>
      </SelectContent>
    </Select>
  );
}
