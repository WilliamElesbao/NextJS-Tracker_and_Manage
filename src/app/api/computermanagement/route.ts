import { prisma } from "@/app/api/db";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const { data } = await req.json();

  if (!data) {
    return Response.json({ message: "Missing data!" });
  }

  try {
    const createRecord = await prisma.equipmentManagement_TB.create({
      data: data,
    });
    return Response.json(
      { message: "Record Saved!", record: createRecord },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return Response.json(
          {
            message:
              "There is a record with that hostname, patrimonyID, serviceTag or serialNumber",
          },
          { status: 409 },
        );
      }
    }
  }
}

export async function GET() {
  try {
    const allRecords = await prisma.equipmentManagement_TB.findMany({
      include: {
        technician: { select: { id: true, username: true, email: true } },
        user: true,
      },
    });
    return Response.json(allRecords, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error:
          "[api/computermanagement/route.ts]:\nErro ao buscar os registros",
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")?.toString();
  const { data } = await req.json();
  try {
    const updatedRecord = await prisma.equipmentManagement_TB.update({
      where: { id: id },
      data: data,
    });
    return Response.json({ message: "Updated record!", record: updatedRecord });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return Response.json({ error: error }, { status: 404 });
      } else if (error.code === "P2002") {
        return Response.json({ error: error }, { status: 409 });
      }
    }
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")?.toString();
  if (!id) {
    return Response.json({ message: "id cannot be empty" }, { status: 400 });
  }
  try {
    await prisma.equipmentManagement_TB.delete({
      where: { id: id },
    });
    return Response.json(
      { record: `record [${id}] successfully deleted` },
      { status: 200 },
    ); // pode ser 204 - No content
  } catch (error) {
    return Response.json({ error: error }, { status: 404 });
  }
}
