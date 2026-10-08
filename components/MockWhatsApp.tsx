'use client';

import { useApp } from './AppProvider';

// Mock WhatsApp-style card. Nothing is actually sent.
export default function MockWhatsApp({ to, body }: { to: string; body: string }) {
  const { t } = useApp();
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/80 shadow-card dark:border-white/10">
      <div className="flex items-center gap-2.5 bg-gradient-to-r from-[#075e54] to-[#0b7a6b] px-4 py-3 text-white">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold ring-1 ring-white/30">
          {to.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="text-sm font-bold leading-tight">{to}</p>
          <p className="text-[11px] opacity-80">{t('wa.title')}</p>
        </div>
        <span className="ml-auto text-[10px] font-semibold uppercase tracking-widest opacity-70">{t('common.ai.simulated')}</span>
      </div>
      <div className="bg-[#e5ddd5] px-4 py-5 dark:bg-[#0b141a]">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#dcf8c6] p-3.5 text-sm text-zinc-900 shadow-md dark:bg-[#005c4b] dark:text-zinc-100">
          {body}
          <span className="mt-1.5 block text-right text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
            ✓✓ {t('wa.sent')}
          </span>
        </div>
      </div>
    </div>
  );
}
