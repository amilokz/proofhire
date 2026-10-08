'use client';

import { useApp } from './AppProvider';

// Mock WhatsApp-style card. Nothing is actually sent.
export default function MockWhatsApp({ to, body }: { to: string; body: string }) {
  const { t } = useApp();
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10">
      <div className="flex items-center gap-2 bg-[#075e54] px-4 py-2.5 text-white">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
          {to.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="text-sm font-bold leading-tight">{to}</p>
          <p className="text-[11px] opacity-80">{t('wa.title')}</p>
        </div>
      </div>
      <div className="bg-[#e5ddd5] px-4 py-5 dark:bg-[#0b141a]">
        <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#dcf8c6] p-3 text-sm text-zinc-900 shadow dark:bg-[#005c4b] dark:text-zinc-100">
          {body}
          <span className="mt-1 block text-right text-[10px] text-zinc-500 dark:text-zinc-400">
            ✓✓ {t('wa.sent')}
          </span>
        </div>
      </div>
    </div>
  );
}
