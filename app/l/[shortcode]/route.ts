import { NextRequest, NextResponse } from "next/server";
import { getLinkByShortCode, incrementLinkClicks } from "@/data/links";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const shortcode = (await params).shortcode;

  if (!shortcode) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const link = await getLinkByShortCode(shortcode);

    if (!link || !link.isActive) {
      // If the link does not exist or is inactive, redirect to home page or a 404
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Await the click increment to ensure it completes in serverless environments
    await incrementLinkClicks(link.id);

    return NextResponse.redirect(new URL(link.originalUrl));
  } catch (error) {
    console.error("Error handling redirect:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
