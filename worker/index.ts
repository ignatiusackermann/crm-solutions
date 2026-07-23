/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { handleDiscoveryBookings } from "./discovery-bookings";
import { handleAdminPaymentPlans,handleClientPaymentPlan,handleCreatePayPalOrder,handlePayPalReturn } from "./payment-plans";
import { handleGeminiVoiceToken } from "./gemini-voice";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
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
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/discovery-bookings") {
      return handleDiscoveryBookings(request, env);
    }
    if (url.pathname === "/api/admin/payment-plans") return handleAdminPaymentPlans(request, env);
    if (url.pathname === "/api/client/payment-plan") return handleClientPaymentPlan(request, env);
    if (url.pathname === "/api/paypal/create-order") return handleCreatePayPalOrder(request, env);
    if (url.pathname === "/api/paypal/return") return handlePayPalReturn(request, env);
    if (url.pathname === "/api/gemini-voice-token") return handleGeminiVoiceToken(request, env);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
