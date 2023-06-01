import { signJwtAcessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: NextResponse) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });

  if (user && (await compare(body.password, user.password))) {
    const { password, ...withoutPassword } = user;
    const accesstoken = signJwtAcessToken(withoutPassword);
    const result = { ...withoutPassword, accesstoken };
    return new Response(JSON.stringify(result));
  }
  return new Response(JSON.stringify(null));
}
