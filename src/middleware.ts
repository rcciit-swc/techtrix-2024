import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { checkUserDetails } from "./utils/functions/checkUserDetails";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const url = new URL(request.nextUrl);

  if (!session) {
    if (
      url.pathname.startsWith("/admin-dashboard") ||
      url.pathname.startsWith("/registration") ||
      url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/coordinator")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (url.pathname.startsWith("/") && url.searchParams.has("ref")) {
      const query: any = url.searchParams.get("ref");
      if (query) {
        res.cookies.set("ref", query, {
          secure: true,
        });
      }
    }
  }
  if (session) {
    if (url.pathname.startsWith("/") && url.searchParams.has("ref")) {
      const query: any = url.searchParams.get("ref");

      if (query) {
        res.cookies.set("ref", query, {
          secure: true,
        });
        const { data, error } = await supabase
          .from("users")
          .update({
            referral_code: query,
          })
          .eq("id", session?.user.id)
          .select();
      }
    }

    if (
      session &&
      session?.user?.email?.includes("@rcciit.org.in" || "@rccinstitue.org")
    ) {
      const { data: swcDetails, error } = await supabase
        .from("swc")
        .select("email")
        .eq("email", session?.user.email);

      if (swcDetails!.length > 0) {
        await supabase
          .from("users")
          .update({
            swc: true,
          })
          .eq("email", session?.user.email)
          .select();
      }
    }

    const userDetails = await supabase
      .from("users")
      .select()
      .eq("id", session?.user.id);

    const userRoles = await supabase
      .from("roles")
      .select("role")
      .eq("id", session?.user.id);
    const superAdmin = userRoles?.data?.[0]?.role?.includes("super_admin");
    const eventCoordinator =
      userRoles?.data?.[0]?.role?.includes("event_coordinator");

    if (
      !checkUserDetails(userDetails?.data?.[0]) &&
      url.pathname !== "/registration"
    ) {
      return NextResponse.redirect(new URL("/registration", request.url));
    }

    if (
      superAdmin &&
      url.pathname.startsWith("/admin-dashboard" || "/coordinator")
    ) {
      return NextResponse.next();
    }

    if (
      !superAdmin &&
      url.pathname.startsWith(
        "/admin-dashboard" || url.pathname.startsWith("/coordinator")
      )
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (eventCoordinator && url.pathname.startsWith("/coordinator")) {
      return NextResponse.next();
    }
    if (superAdmin && url.pathname.startsWith("/coordinator")) {
      return NextResponse.next();
    }

    if (!eventCoordinator && url.pathname.startsWith("/coordinator")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
  ],
};
