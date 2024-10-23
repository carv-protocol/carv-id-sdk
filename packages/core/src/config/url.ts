import { Enum_Env } from "../enum/env";

export const MapUrl = {
  [Enum_Env.DEV]: {
    TELEGRAM_BOT_URL: "https://t.me/carv_identity_bot",
    TELEGRAM_APP_URL: "https://t.me/carv_identity_dev_bot/carv_id",
  },
  [Enum_Env.PROD]: {
    TELEGRAM_BOT_URL: "https://t.me/carv_identity_bot",
    TELEGRAM_APP_URL: "https://t.me/carv_identity_bot/carv_id",
  },
};
