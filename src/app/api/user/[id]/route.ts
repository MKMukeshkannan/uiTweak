import { verifyJwtAcessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { verify } from "crypto";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const accesstoken = request.headers.get("authorization");
  if (!accesstoken || !verifyJwtAcessToken(accesstoken)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }
  const userDetails = await prisma.user.findFirst({
    where: {
      id: params.id,
    },
    include: {
      saved: {
        select: {
          templatename: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(userDetails));
}
