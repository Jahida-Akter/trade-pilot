import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, getAdminToken, safeEqual } from "@/lib/adminAuth";
import { detectLocale } from "@/lib/i18n";

// Paths that are allowed to render without being redirected to the funnel root.
const ALLOWED_PREFIXES = [
  "/",           // funnel root (exact match handled separately)
  "/platform",
  "/go",
  "/match",
  "/qualify",
  "/reality",
  "/gate-2",
  "/proceed",
  "/continue",
  "/outcome",
  "/exit",
  "/thanks",
  "/why-deposits-fail",
  "/restricted",
  "/terms",
  "/privacy",
  "/disclaimer",
  "/api/",
  "/admin/",
  "/_next/",
  "/robots.txt",
  "/sitemap.xml",
  "/favicon.ico",
  "/images/",
  "/public/",
];

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Admin auth
  if (path.startsWith("/admin")) {
    if (path === "/admin/login" || path === "/admin/logout") {
      return NextResponse.next();
    }
    const token = getAdminToken();
    const cookieVal = req.cookies.get(ADMIN_COOKIE)?.value ?? "";
    if (token && safeEqual(cookieVal, token)) {
      return NextResponse.next();
    }
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", path);
    return NextResponse.redirect(loginUrl);
  }

  const countryHeader =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry");
  const locale = detectLocale(
    req.headers.get("accept-language") ?? "",
    countryHeader,
  );

  const isAllowed =
    path === "/" ||
    ALLOWED_PREFIXES.some((p) => p !== "/" && (path === p || path.startsWith(p + "/")));

  // Any unrecognised path → send visitor to the funnel root
  if (!isAllowed) {
    const home = req.nextUrl.clone();
    home.pathname = "/";
    home.search = "";
    return NextResponse.redirect(home, 302);
  }

  const isExempt = ALLOWED_PREFIXES.some((p) => path === p || path.startsWith(p));

  const res = NextResponse.next();

  if (!isExempt) {
    // Stamp _ad_verified so funnel pages know the visitor came through
    res.cookies.set("_ad_verified", "1", {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
    });
  }

  res.cookies.set("NEXT_LOCALE", locale, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
  });

  return res;
}

export default proxy;

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
