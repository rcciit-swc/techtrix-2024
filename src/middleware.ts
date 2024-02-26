import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import { checkUserDetails } from "./utils/functions/checkUserDetails";
import { login } from "./utils/functions";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req: request, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = new URL(request.url);

  // case: user is trying to access a protected page without logging in
  // redirect to landing page
  if (!session) {
    if (url.pathname.startsWith("/admin") || url.pathname === "/registration") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  // case: user is logged in
  // check if user has completed profile
  // if not, redirect to profile page
  else {
    const userDetails = await supabase
      .from("users")
      .select()
      .eq("id", session?.user.id);

    // if user is already in the profile page, dont redirect again
    if (
      !checkUserDetails(userDetails?.data?.[0]) &&
      url.pathname !== "/registration"
    ) {
      return NextResponse.redirect(new URL("/registration", request.url));
    }

    if (url.pathname === "/admin") {
      const userRoles = await supabase
        .from("roles")
        .select("role")
        .eq("id", session?.user.id);

      if (!userRoles?.data?.[0]?.role?.includes("super_admin")) {
        return NextResponse.redirect(
          new URL("/?error=permission_error", request.url)
        );
      }
    }

    if (url.pathname === "/coordinator-dashboard") {
      const userRoles = await supabase
        .from("roles")
        .select()
        .eq("id", session?.user.id);

      if (
        !userRoles?.data?.[0]?.role?.includes("event_coordinator") &&
        !userRoles?.data?.[0]?.role?.includes("super_admin")
      ) {
        return NextResponse.redirect(
          new URL("/?error=permission_error", request.url)
        );
      }
      return NextResponse.next();
    }

    // TODO: implement event management page
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
  ],
};
