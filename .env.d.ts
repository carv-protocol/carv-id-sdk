/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
  readonly VITE_TELEGRAM_BOT_URL: string;
  readonly VITE_TELEGRAM_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    Telegram?: any;
  }
}

export {};
