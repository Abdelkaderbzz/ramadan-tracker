'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, Info, InfoIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function ZakatCalculator() {
  const t = useTranslations('Zakat');
  const [assets, setAssets] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    investments: 0,
    business: 0,
  });
  const [debts, setDebts] = useState(0);

  const calculateZakat = useCallback(() => {
    const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0);
    const netAssets = totalAssets - debts;
    return netAssets > 0 ? netAssets * 0.025 : 0;
  }, [assets, debts]);

  const handleAssetChange = (key: keyof typeof assets, value: string) => {
    const numValue = parseFloat(value) || 0;
    setAssets((prev) => ({ ...prev, [key]: numValue }));
  };

  const netWealth = Object.values(assets).reduce((a, b) => a + b, 0) - debts;
  const zakatValue = calculateZakat();

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl font-medium flex items-center gap-2'>
          <Calculator className='h-5 w-5 text-purple-600' />
          {t('title')}
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className='h-4 w-4 text-muted-foreground cursor-help' />
            </TooltipTrigger>
            <TooltipContent className='max-w-[250px]'>
              <p>{t('nisab_info')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className='space-y-6 py-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label>{t('cash')}</Label>
            <Input
              type='number'
              placeholder='0.00'
              onChange={(e) => handleAssetChange('cash', e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label>{t('gold')}</Label>
            <Input
              type='number'
              placeholder='0.00'
              onChange={(e) => handleAssetChange('gold', e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label>{t('investments')}</Label>
            <Input
              type='number'
              placeholder='0.00'
              onChange={(e) => handleAssetChange('investments', e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label>{t('business')}</Label>
            <Input
              type='number'
              placeholder='0.00'
              onChange={(e) => handleAssetChange('business', e.target.value)}
            />
          </div>
          <div className='space-y-2 md:col-span-2'>
            <Label className='text-red-500'>{t('debts')}</Label>
            <Input
              type='number'
              placeholder='0.00'
              className='border-red-200 dark:border-red-900/30'
              onChange={(e) => setDebts(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className='mt-8 p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/50 flex flex-col items-center text-center gap-2'>
          <div className='text-sm text-purple-600 dark:text-purple-400 font-medium'>
            {t('net_wealth')}
          </div>
          <div className='text-2xl font-bold tabular-nums'>
            {netWealth.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className='h-px w-full bg-purple-200 dark:bg-purple-800/50 my-2' />
          <div className='text-sm text-muted-foreground'>
            {t('zakat_due')} (2.5%)
          </div>
          <div className='text-4xl font-black text-purple-600 dark:text-purple-400 tabular-nums'>
            {zakatValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
