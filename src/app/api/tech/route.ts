"use server";

import { prisma } from "@/app/api/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idFromSearchParams = searchParams.get("techID");

  if (!idFromSearchParams) {
    return;
  }

  try {
    const allRecords = await prisma.technician_TB.findUnique({
      where: {
        id: idFromSearchParams,
      },
      select: { id: true, username: true, email: true },
    });

    return Response.json(allRecords, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error: "[api/tech/route.ts]:\nErro ao buscar os registros",
      },
      { status: 500 },
    );
  }
}
