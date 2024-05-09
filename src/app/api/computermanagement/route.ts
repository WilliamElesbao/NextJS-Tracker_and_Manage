"use server";

import { prisma } from "@/app/api/db";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data);
    if (!data || Object.keys(data).length === 0) {
      return new Response(JSON.stringify({ message: "Missing data!" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const createRecord = await prisma.equipmentManagement_TB.create({
      data,
    });

    return new Response(
      JSON.stringify({
        message: "Record Saved!",
        record: createRecord,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return new Response(
        JSON.stringify({
          message:
            "There is a record with that hostname, patrimonyID, serviceTag, or serial number",
        }),
        { status: 409, headers: { "Content-Type": "application/json" } },
      );
    }

    console.error("Unhandled error:", error);

    return new Response(
      JSON.stringify({
        message: "An unexpected error occurred.",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idFromSearchParams = searchParams.get("id");
  console.log(idFromSearchParams);

  if (!idFromSearchParams) {
    try {
      const allRecords = await prisma.equipmentManagement_TB.findMany({
        include: {
          technician: { select: { id: true, username: true, email: true } },
          user: true,
        },
      });
      const responseData = allRecords.map((record) => ({
        ...record,
        checkInDate: format(new Date(record.checkInDate), "dd/MM/yyyy"),
        checkOutDate: format(new Date(record.checkOutDate), "dd/MM/yyyy"),
        // createdAt: format(new Date(record.createdAt), "dd/MM/yyyy HH:mm:ss"),
        createdAt: format(new Date(record.createdAt), "dd/MM/yyyy"),
        updatedAt: format(new Date(record.updatedAt), "dd/MM/yyyy"),
      }));
      console.log(responseData);

      return Response.json(responseData, { status: 200 });
    } catch (error) {
      return Response.json(
        {
          error:
            "[api/computermanagement/route.ts]:\nErro ao buscar os registros",
        },
        { status: 500 },
      );
    }
  } else {
    const recordToEdit = await prisma.equipmentManagement_TB.findUnique({
      where: {
        id: idFromSearchParams,
      },
      include: {
        technician: { select: { id: true, username: true, email: true } },
        user: true,
      },
    });
    return Response.json(recordToEdit);
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id")?.toString();
  const { data } = await req.json();
  console.log(data);
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
