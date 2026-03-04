'use client';

import { useState, useCallback } from 'react';
import { Share2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

const SHARE_URL = 'https://ramadantracker.tech';

function FacebookIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
      <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
      <path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
    </svg>
  );
}

function SnapchatIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
      <path d='M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301a.32.32 0 01.134-.027c.193 0 .33.093.39.14.104.074.18.193.2.33.02.14-.04.28-.14.37-.12.12-.33.23-.55.31a2.8 2.8 0 01-.76.18c-.07.01-.14.02-.2.04a.658.658 0 00-.18.07c-.08.06-.12.15-.14.25a.73.73 0 00.03.28c.41 1.14 1.27 2.07 2.42 2.59.13.06.265.12.39.17.31.13.59.24.75.51.13.22.12.48.02.71-.18.39-.61.63-1.13.76-.15.04-.31.07-.49.1-.06.01-.13.02-.2.04-.36.06-.55.15-.57.59 0 .1-.01.2-.03.3-.06.29-.24.57-.51.7-.4.2-.87.27-1.4.32-.12.01-.24.02-.37.04-.24.03-.49.06-.73.12-.28.08-.56.21-.86.35-.53.25-1.12.54-2.07.54-.02 0-.05 0-.08 0-.56 0-1.14-.28-1.68-.53-.3-.14-.58-.27-.86-.35-.25-.06-.5-.09-.73-.12-.13-.02-.25-.03-.37-.04-.52-.05-.99-.12-1.39-.32-.28-.14-.46-.42-.52-.71a1.6 1.6 0 01-.03-.3c-.02-.44-.21-.53-.57-.59-.07-.02-.14-.03-.2-.04-.18-.03-.34-.06-.49-.1-.52-.14-.95-.37-1.13-.76a.74.74 0 01.02-.71c.16-.27.44-.38.75-.51.13-.05.26-.11.39-.17 1.15-.52 2.01-1.45 2.42-2.59a.73.73 0 00.03-.28c-.02-.1-.06-.19-.14-.25a.658.658 0 00-.18-.07c-.06-.02-.13-.03-.2-.04a2.8 2.8 0 01-.76-.18c-.22-.08-.43-.19-.55-.31-.1-.09-.16-.23-.14-.37.02-.14.1-.26.2-.33.06-.05.2-.14.39-.14a.32.32 0 01.13.03c.38.18.73.3 1.04.3.2 0 .33-.04.4-.09a5.1 5.1 0 01-.03-.51l-.003-.06c-.104-1.628-.23-3.654.3-4.847C7.86 1.069 11.216.793 12.206.793z' />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
      <path d='M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm6.066 9.645c.183.049.3.226.3.413 0 .108-.04.22-.12.314a.4.4 0 01-.32.154c-.156 0-.31-.088-.386-.23a3.068 3.068 0 00-.88-.79c-.52-.33-1.14-.54-1.84-.54-.94 0-1.65.38-2.15.85-.47.44-.79 1.01-.73 1.5.01.08.03.15.05.22.42-.07.87-.1 1.33-.1 1.44 0 2.78.38 3.77 1.04.98.66 1.58 1.57 1.58 2.59 0 1.02-.6 1.93-1.58 2.59-.99.66-2.33 1.04-3.77 1.04s-2.78-.38-3.77-1.04c-.98-.66-1.58-1.57-1.58-2.59 0-1.02.6-1.93 1.58-2.59.5-.33 1.08-.58 1.72-.76-.03-.14-.05-.28-.05-.43 0-.88.47-1.74 1.14-2.35.7-.63 1.66-1.07 2.82-1.07.86 0 1.63.26 2.27.65.35.21.65.47.89.77a.75.75 0 01.31-.07zM9.5 14.5c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm5.5 1c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-1.5 2c-1.1 0-2.08-.45-2.71-1.17a.5.5 0 01.72-.7c.45.52 1.18.87 1.99.87s1.54-.35 1.99-.87a.5.5 0 01.72.7C14.58 17.05 13.6 17.5 12.5 17.5z' />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-5 w-5 fill-current'>
      <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
    </svg>
  );
}

export function ShareButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = useTranslations('Share');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const { toast } = useToast();

  const shareUrl = `${SHARE_URL}/${locale}`;

  const handleShare = useCallback(
    (platform: string) => {
      const text = t('share_text');
      const url = shareUrl;
      const encodedUrl = encodeURIComponent(url);
      const encodedText = encodeURIComponent(text);
      const encodedBoth = encodeURIComponent(`${text} ${url}`);

      const urls: Record<string, string> = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        x: `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodeURIComponent('Ramadan Tracker 🌙')}&summary=${encodedText}`,
        whatsapp: `https://wa.me/?text=${encodedBoth}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
        snapchat: `https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}`,
        reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
        email: `mailto:?subject=${encodeURIComponent('Ramadan Tracker 🌙')}&body=${encodedBoth}`,
      };

      const target = urls[platform];
      if (target) {
        window.open(target, '_blank', 'noopener,noreferrer');
      }
    },
    [t, shareUrl],
  );

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: t('copied_toast') });
    setTimeout(() => setCopied(false), 2000);
  }, [shareUrl, toast, t]);

  const socials = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <WhatsAppIcon />,
      color: 'bg-[#25D366] hover:bg-[#1DA851]',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: <TelegramIcon />,
      color: 'bg-[#0088cc] hover:bg-[#006699]',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <FacebookIcon />,
      color: 'bg-[#1877F2] hover:bg-[#166FE5]',
    },
    {
      id: 'x',
      name: 'X',
      icon: <XIcon />,
      color: 'bg-black hover:bg-gray-800',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      color: 'bg-[#0A66C2] hover:bg-[#004182]',
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: <SnapchatIcon />,
      color: 'bg-[#FFFC00] hover:bg-[#E6E300] text-black',
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: <RedditIcon />,
      color: 'bg-[#FF4500] hover:bg-[#E03D00]',
    },
    {
      id: 'email',
      name: 'Email',
      icon: <EmailIcon />,
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  const handleButtonClick = useCallback(async () => {
    const isMobile =
      /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    if (isMobile && typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Ramadan Tracker 🌙',
          text: t('share_text'),
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or share failed — fall through to dialog
      }
    }
    setOpen(true);
  }, [t, shareUrl]);

  return (
    <>
      <Button
        variant='outline'
        size='sm'
        onClick={handleButtonClick}
        className='flex items-center gap-1.5 border-purple-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-400 transition-all'
      >
        <Share2 className='h-4 w-4' />
        <span className='text-xs font-medium'>{t('button')}</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-md' dir={isRtl ? 'rtl' : 'ltr'}>
          <DialogHeader className='text-center'>
            <DialogTitle className='text-xl text-center'>
              {t('title')}
            </DialogTitle>
            <DialogDescription className='text-center'>
              {t('description')}
            </DialogDescription>
          </DialogHeader>

          {/* Hadith */}
          <div className='bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-xl p-4 text-center'>
            <p className='text-purple-800 dark:text-purple-200 font-semibold text-base leading-relaxed'>
              {t('hadith')}
            </p>
            <p className='text-purple-500 dark:text-purple-400 text-xs mt-2'>
              {t('hadith_source')}
            </p>
          </div>

          {/* Social buttons */}
          <div className='grid grid-cols-4 gap-3'>
            {socials.map((social) => (
              <button
                key={social.id}
                onClick={() => handleShare(social.id)}
                className={`${social.color} ${social.id === 'snapchat' ? '' : 'text-white'} rounded-xl p-3 flex flex-col items-center gap-1.5 transition-all hover:scale-105 hover:shadow-lg cursor-pointer`}
              >
                {social.icon}
                <span className='text-[10px] font-medium'>{social.name}</span>
              </button>
            ))}
          </div>

          {/* Copy link */}
          <div className='flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-2'>
            <input
              type='text'
              readOnly
              value={shareUrl}
              className='flex-1 bg-transparent text-sm text-gray-600 dark:text-gray-300 outline-none px-2 min-w-0'
              dir='ltr'
            />
            <Button
              size='sm'
              variant='outline'
              onClick={handleCopy}
              className='text-xs shrink-0'
            >
              {copied ? '✓' : t('copy')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
