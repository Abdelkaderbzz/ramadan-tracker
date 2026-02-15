'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SavedDuaListProps {
  savedDuas: string[];
  removeDua: (index: number) => void;
  title: string;
}

export function SavedDuaList({
  savedDuas,
  removeDua,
  title,
}: SavedDuaListProps) {
  if (savedDuas.length === 0) return null;

  return (
    <div className='mt-4'>
      <h4 className='text-sm font-medium mb-2'>{title}</h4>
      <div className='space-y-2 max-h-[150px] overflow-y-auto pr-1'>
        <AnimatePresence border-separate='true'>
          {savedDuas.map((dua, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='flex items-center justify-between p-2 bg-muted/50 rounded-md'
            >
              <p className='text-sm flex-1'>{dua}</p>
              <Button
                variant='ghost'
                size='icon'
                className='h-7 w-7 text-muted-foreground hover:text-destructive'
                onClick={() => removeDua(index)}
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
