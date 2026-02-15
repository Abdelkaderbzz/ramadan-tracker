'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function PwaInstallPrompt() {
  const t = useTranslations('Index'); // Assuming we can reuse Index or add PWA keys
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className='fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between bg-purple-600 text-white p-4 rounded-lg shadow-lg md:max-w-md md:left-auto'
        >
          <div className='flex items-center gap-3'>
            <div className='bg-white/20 p-2 rounded-full'>
              <Download className='h-5 w-5' />
            </div>
            <div>
              <p className='font-medium text-sm'>{t('install_app')}</p>
              <p className='text-xs text-purple-100'>{t('install_desc')}</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              variant='secondary'
              onClick={handleInstallClick}
              className='whitespace-nowrap bg-white text-purple-600 hover:bg-purple-50'
            >
              {t('install_btn')}
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className='p-1 hover:bg-white/20 rounded-full transition-colors'
            >
              <X className='h-4 w-4' />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
