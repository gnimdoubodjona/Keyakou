// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { error } from "console";
import { NextRequest } from "next/server";

export async function GET(request: Request) {
    return auth.handler(request);
}

export async function POST(request: Request) {
    return auth.handler(request);
}

