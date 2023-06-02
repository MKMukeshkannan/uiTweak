import { verifyJwtAcessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

interface RequestBody {
  templatename: string;
  state: {};
}

export async function GET(request: NextRequest) {
  const accesstoken = request.headers.get("authorization")?.split(" ")[1];

  if (!accesstoken || !verifyJwtAcessToken(accesstoken)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }

  const { id: sessionUserId } = verifyJwtAcessToken(accesstoken);

  if (sessionUserId) {
    const tempDetails = await prisma.template.findMany({
      where: {
        userId: sessionUserId,
      },
      select: {
        id: true,
        templatename: true,
        style: true,
      },
    });

    return new Response(JSON.stringify(tempDetails));
  }
}

export async function POST(request: Request) {
  const accesstoken = request.headers.get("authorization")?.split(" ")[1];
  if (!accesstoken || !verifyJwtAcessToken(accesstoken)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
    });
  }
  const { id: sessionUserId } = verifyJwtAcessToken(accesstoken);
  const body: RequestBody = await request.json();

  const templateObj = await prisma.template.create({
    data: {
      templatename: body.templatename,
      style: body.state,
      user: {
        connect: {
          id: sessionUserId,
        },
      },
    },
  });

  return templateObj;
}
