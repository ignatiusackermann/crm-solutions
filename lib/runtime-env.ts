import { getSqlDatabase, type SqlDatabase } from "./sql";

export type AppEnv = {
  DB: SqlDatabase | null;
  RESEND_API_KEY?: string;
  DISCOVERY_ADMIN_EMAIL?: string;
  DISCOVERY_FROM_EMAIL?: string;
  DISCOVERY_MEETING_URL?: string;
  ADMIN_EMAIL?: string;
  PAYMENT_FROM_EMAIL?: string;
  PAYPAL_CLIENT_ID?: string;
  PAYPAL_CLIENT_SECRET?: string;
  PAYPAL_ENV?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  GOOGLE_REFRESH_TOKEN?: string;
  GOOGLE_CALENDAR_ID?: string;
  GEMINI_API_KEY?: string;
};

export function getAppEnv(): AppEnv {
  return {
    DB: getSqlDatabase(),
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    DISCOVERY_ADMIN_EMAIL: process.env.DISCOVERY_ADMIN_EMAIL,
    DISCOVERY_FROM_EMAIL: process.env.DISCOVERY_FROM_EMAIL,
    DISCOVERY_MEETING_URL: process.env.DISCOVERY_MEETING_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    PAYMENT_FROM_EMAIL: process.env.PAYMENT_FROM_EMAIL,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
    PAYPAL_ENV: process.env.PAYPAL_ENV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  };
}
