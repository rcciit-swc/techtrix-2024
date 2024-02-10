import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "./types/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const url = new URL(req.url);

  if (url.pathname.startsWith("/admin")) {
    const userRoles = await supabase
      .from("roles")
      .select()
      .eq("id", session?.user?.id!);

    if (
      !userRoles?.data?.[0]?.role?.includes("event_coordinator") &&
      !userRoles?.data?.[0]?.role?.includes("super_admin")
    ) {
      return NextResponse.redirect(
        new URL("/?error=permission_error", req.url)
      );
    }

    return NextResponse.next();
  }
  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
