import prisma from "@/lib/prisma";

interface RequestBody {
  templatename: string;
  style: {};
  userid: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const template = await prisma.template.create({
    data: {
      templatename: body.templatename,
      style: body.style,
      user: {
        connect: {
          id: body.userid,
        },
      },
    },
  });
  return new Response(JSON.stringify(template));
}
