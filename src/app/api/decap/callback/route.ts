import { NextResponse } from "next/server";

export const runtime = "nodejs";

type GitHubTokenResponse = {
  access_token?: string;
  token_type?: string;
  scope?: string;
  error?: string;
  error_description?: string;
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

const callbackHtml = (status: "success" | "error", payload: object) => {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Authorizing Decap CMS</title>
  </head>
  <body>
    <p>Authorizing Decap CMS...</p>
    <script>
      (function () {
        var message = ${JSON.stringify(message)};
        var sent = false;

        var sendAuthorization = function () {
          if (sent) return;
          sent = true;

          if (window.opener) {
            window.opener.postMessage(message, window.location.origin);
            window.setTimeout(function () {
              window.close();
            }, 500);
          } else {
            document.body.insertAdjacentHTML("beforeend", "<p>You can close this window and return to the CMS.</p>");
          }
        };

        var receiveMessage = function (event) {
          if (event.origin !== window.location.origin) return;
          if (event.data !== "authorizing:github") return;

          sendAuthorization();
          window.removeEventListener("message", receiveMessage, false);
        };

        window.addEventListener("message", receiveMessage, false);

        if (window.opener) {
          window.opener.postMessage("authorizing:github", window.location.origin);
        } else {
          sendAuthorization();
        }
      })();
    </script>
  </body>
</html>`;
};

const htmlResponse = (html: string, status = 200) =>
  new NextResponse(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });

export async function GET(request: Request) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return htmlResponse(
      callbackHtml("error", {
        error: "Missing GitHub OAuth environment variables.",
      }),
      500,
    );
  }

  const url = new URL(request.url);
  const provider = url.searchParams.get("provider") ?? "github";
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");

  if (provider !== "github") {
    return htmlResponse(
      callbackHtml("error", { error: `Unsupported OAuth provider: ${provider}` }),
      400,
    );
  }

  if (error) {
    return htmlResponse(
      callbackHtml("error", {
        error,
        error_description: errorDescription ?? "GitHub authorization failed.",
      }),
      400,
    );
  }

  if (!code) {
    return htmlResponse(
      callbackHtml("error", { error: "Missing GitHub OAuth code." }),
      400,
    );
  }

  const siteOrigin = getSiteOrigin(request);
  const redirectUri = `${siteOrigin}/api/decap/callback?provider=github`;

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = (await tokenResponse.json()) as GitHubTokenResponse;

  if (!tokenResponse.ok || tokenData.error || !tokenData.access_token) {
    return htmlResponse(
      callbackHtml("error", {
        error: tokenData.error ?? "github_token_exchange_failed",
        error_description:
          tokenData.error_description ?? "Could not exchange GitHub OAuth code.",
      }),
      400,
    );
  }

  return htmlResponse(callbackHtml("success", { token: tokenData.access_token }));
}
