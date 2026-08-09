import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { newsletterSchema } from "@/lib/newsletter-schema";

const POSTGRES_UNIQUE_VIOLATION = "23505";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid data." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: parsed.data.email });

  // Already subscribed isn't a failure from the visitor's point of view.
  if (error && error.code !== POSTGRES_UNIQUE_VIOLATION) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
