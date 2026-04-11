import { type NextRequest } from "next/server";
import { proxy } from "./proxy-handler";

export function middleware(req: NextRequest) {
  return proxy(req);
}

// Run on every route except Next.js internals, static files, and Vercel infrastructure
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_vercel|favicon\.ico|robots\.txt|sitemap\.xml|images/).*)",
  ],
};
