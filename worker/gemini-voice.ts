import { GoogleGenAI } from "@google/genai";

interface GeminiVoiceEnv {
  GEMINI_API_KEY?: string;
}

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store, max-age=0",
};

export async function handleGeminiVoiceToken(
  request: Request,
  env: GeminiVoiceEnv,
): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { ...JSON_HEADERS, allow: "POST" },
    });
  }

  const origin = request.headers.get("origin");
  const expectedOrigin = new URL(request.url).origin;
  if (origin && origin !== expectedOrigin) {
    return new Response(JSON.stringify({ error: "Origin not allowed." }), {
      status: 403,
      headers: JSON_HEADERS,
    });
  }

  if (!env.GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "The Voice Business Advisor is awaiting its private Gemini connection.",
        code: "VOICE_NOT_CONFIGURED",
      }),
      { status: 503, headers: JSON_HEADERS },
    );
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
      httpOptions: { apiVersion: "v1alpha" },
    });

    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        expireTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        newSessionExpireTime: new Date(Date.now() + 60 * 1000).toISOString(),
        httpOptions: { apiVersion: "v1alpha" },
      },
    });

    return new Response(
      JSON.stringify({
        token: token.name,
        model: "gemini-3.1-flash-live-preview",
        apiVersion: "v1alpha",
      }),
      { headers: JSON_HEADERS },
    );
  } catch (error) {
    console.error("Gemini voice token error", error);
    return new Response(
      JSON.stringify({
        error: "The voice connection could not be prepared. Please try again.",
        code: "VOICE_TOKEN_FAILED",
      }),
      { status: 502, headers: JSON_HEADERS },
    );
  }
}
