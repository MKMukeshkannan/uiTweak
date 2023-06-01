import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const userObj = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await hash(body.password, 10),
    },
  });
  const { password, ...result } = userObj;
  return new Response(JSON.stringify(result));
}
