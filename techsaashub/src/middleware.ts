import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

// Scoped to /admin — the public site never touches Supabase auth, so there's
// no reason to pay the session-refresh cost on every public page request.
export const config = {
  matcher: ["/admin/:path*"],
};
