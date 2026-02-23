'use client';

import { useState, useEffect } from 'react';

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone;
    setIsStandalone(!!standalone);

    
    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(!!ios);

    if (ios && !standalone) {
      setIsInstallable(true);
    }

    const handler = (e: any) => {
      
      e.preventDefault();
      
      setDeferredPrompt(e);
      
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt && !isIOS) return;

    if (isIOS) {
      
      
      return { type: 'ios' };
    }

    
    deferredPrompt.prompt();

    
    const { outcome } = await deferredPrompt.userChoice;

    
    setDeferredPrompt(null);
    setIsInstallable(false);

    return { type: 'android', outcome };
  };

  return { isInstallable, isIOS, isStandalone, installApp };
}
