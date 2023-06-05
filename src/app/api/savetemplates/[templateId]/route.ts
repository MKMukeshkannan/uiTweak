import { verifyJwtAcessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { templateId: string } }
) {
  const accesstoken = request.headers.get("authorization")?.split(" ")[1];
  if (!accesstoken || !verifyJwtAcessToken(accesstoken)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const payload = verifyJwtAcessToken(accesstoken);

  const tempDetails = await prisma.template.findFirst({
    where: {
      userId: payload?.id,
      id: params.templateId,
    },
    select: {
      id: true,
      templatename: true,
      style: true,
    },
  });
  //console.log(tempDetails);

  if (tempDetails === null)
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  return new Response(JSON.stringify(tempDetails));
}
