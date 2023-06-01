import Templates from "@/app/templates/page";
import { verifyJwtAcessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { templateId: string } }
) {
  const accesstoken = request.headers.get("authorization");
  if (!accesstoken || !verifyJwtAcessToken(accesstoken)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  const { id: sessionUserId } = verifyJwtAcessToken(accesstoken);

  const tempDetails = await prisma.template.findFirst({
    where: {
      userId: sessionUserId,
      id: params.templateId,
    },
    select: {
      id: true,
      templatename: true,
      style: true,
    },
  });

  return new Response(JSON.stringify(tempDetails));
}
