// app/api/cloudinary/signature/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder") || "challenge_assets";

    const timestamp = Math.round(new Date().getTime() / 1000);
    
    const signature = cloudinary.utils.api_sign_request(
      { 
        timestamp, 
        folder 
      },
      process.env.CLOUDINARY_API_SECRET!
    );
    
    return NextResponse.json({
      signature,
      timestamp,
      api_key: process.env.CLOUDINARY_API_KEY!,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
      folder
    });

  } catch (error) {
    console.error("❌ Erreur génération signature:", error);
    return NextResponse.json(
      { error: "Erreur génération signature" },
      { status: 500 }
    );
  }
}