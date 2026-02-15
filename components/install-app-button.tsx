'use client';

import { usePwaInstall } from '@/hooks/use-pwa-install';
import { Button } from '@/components/ui/button';
import { Download, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useToast } from '@/hooks/use-toast';

export function InstallAppButton() {
  const t = useTranslations('Index');
  const { isInstallable, isStandalone, isIOS, installApp } = usePwaInstall();
  const { toast } = useToast();

  if (isStandalone || !isInstallable) return null;

  const handleInstall = async () => {
    const result = await installApp();
    if (result?.type === 'ios') {
      toast({
        title: t('install_app'),
        description: t('ios_install_desc'),
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            onClick={handleInstall}
            className='gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 hidden md:flex'
          >
            <Download className='h-4 w-4' />
            <span>{t('install_btn')}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isIOS ? t('ios_install_desc') : t('install_desc')}</p>
        </TooltipContent>
      </Tooltip>

      {/* Mobile icon version */}
      <Button
        variant='ghost'
        size='icon'
        onClick={handleInstall}
        className='text-purple-700 md:hidden relative'
      >
        <Download className='h-5 w-5' />
        <span className='absolute top-1 right-1 flex h-2 w-2'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-2 w-2 bg-purple-500'></span>
        </span>
      </Button>
    </TooltipProvider>
  );
}
