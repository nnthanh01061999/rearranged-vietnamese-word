import { AUTH, STATE } from "@/data";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const state = request.cookies.get(STATE);
  const value = state?.value ? JSON.parse(state?.value) : undefined;
  const auth = !!value?.[AUTH];

  const handleI18nRouting = createMiddleware({
    locales: ["vi", "en"],
    defaultLocale: "vi",
    localeDetection: true,
    pathnames: {
      "/": "/",
    },
    localePrefix: "never",
  });

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(vi|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!api|_next|_vercel|monitoring|.*\\..*).*)",
  ],
};
