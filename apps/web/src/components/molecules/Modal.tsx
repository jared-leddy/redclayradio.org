// NPM Modules
import { useEffect, type ReactNode } from 'react';

// Custom Modules
import CircleXMark from '../atoms/icons/CircleXMark';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

/**
 * Generic centered modal: a dimmed backdrop over the page with a bordered panel.
 * Closes on backdrop click, the close button, or the Escape key, and renders
 * nothing while `isOpen` is false.
 */
export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role='presentation'
      onClick={onClose}
      className='fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 p-4'
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
        className='w-full max-w-lg border border-red-500 bg-zinc-950 p-6'
      >
        <div className='mb-5 flex items-center justify-between border-b border-red-500 pb-3'>
          <h2 className='font-display text-4xl font-black uppercase tracking-display text-orange-100'>{title}</h2>
          <button type='button' aria-label='Close' onClick={onClose} className='cursor-pointer'>
            <CircleXMark />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
