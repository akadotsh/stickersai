import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const params = new URL(req.url).searchParams;

  const searchParamsSchema = z.object({
    id: z.string().min(1),
    secret: z.string().min(1),
  });

  const searchParams = searchParamsSchema.safeParse(Object.fromEntries(params));

  if (!searchParams.success) {
    return NextResponse.json(searchParams.error, { status: 400 });
  }

  const { id, secret } = searchParams.data;

  if (process.env.WEBHOOK_SECRET_KEY) {
    if (secret !== process.env.WEBHOOK_SECRET_KEY) {
      return new Response("Invalid secret", { status: 401 });
    }
  }

  const body = await req.json();
  const { output } = body;

  if (!output) {
    return new Response("Unable to retieve output", { status: 400 });
  }

  const file = await fetch(output[1]).then((res) => res.blob());

  return NextResponse.json({ ok: true });
}
