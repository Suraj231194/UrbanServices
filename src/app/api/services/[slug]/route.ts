import { NextResponse } from "next/server";
import { getServiceBySlug } from "@/lib/data";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const params = await context.params;
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return NextResponse.json({ message: "Service not found" }, { status: 404 });
  }

  const { icon, ...serializableService } = service;

  return NextResponse.json(
    {
      ...serializableService,
      iconName: icon.displayName ?? icon.name ?? "ServiceIcon",
    },
    {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
    },
    },
  );
}

