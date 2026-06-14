import { NextResponse } from "next/server";

export const runtime = "nodejs";

type OAuthState = {
  provider: "github";
  nonce: string;
};

const getSiteOrigin = (request: Request) => {
  const configuredSiteUrl = process.env.DECAP_CMS_SITE_URL;

  if (configuredSiteUrl) {
    return configuredSiteUrl.replace(/\/$/, "");
  }

  const url = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return url.origin;
};

const encodeState = (state: OAuthState) =>
  Buffer.from(JSON.stringify(state)).toString("base64url");

const createNonce = () => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export async function GET(request: Request) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "Missing GITHUB_CLIENT_ID environment variable." },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const provider = url.searchParams.get("provider") ?? "github";

  if (provider !== "github") {
    return NextResponse.json(
      { error: `Unsupported OAuth provider: ${provider}` },
      { status: 400 },
    );
  }

  const siteOrigin = getSiteOrigin(request);
  const redirectUri = `${siteOrigin}/api/decap/callback?provider=github`;
  const scope = process.env.DECAP_CMS_GITHUB_SCOPE ?? "repo,user";
  const state = encodeState({ provider: "github", nonce: createNonce() });

  const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
  githubAuthUrl.searchParams.set("client_id", clientId);
  githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
  githubAuthUrl.searchParams.set("scope", scope);
  githubAuthUrl.searchParams.set("state", state);

  return NextResponse.redirect(githubAuthUrl);
}
