"use server";

import { prisma } from "@/app/api/db";
import {
  ComputerStatus,
  ComputerType,
  Location,
} from "@/lib/types/RecordsTypes";
import { format } from "date-fns";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchAllRecords() {
  const recordsFromServer = await prisma.equipmentManagement_TB.findMany({
    include: {
      technician: { select: { id: true, username: true, email: true } },
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // TODO: utils para formatar data
  const formattedData = recordsFromServer.map((record) => ({
    ...record,
    computerType: record.computerType as ComputerType,
    location: record.location as Location,
    computerStatus: record.computerStatus as ComputerStatus,
    checkInDate: format(new Date(record.checkInDate), "dd/MM/yyyy"),
    checkOutDate: format(new Date(record.checkOutDate!!), "dd/MM/yyyy"), //dd/MM/yyyy HH:mm:ss
    createdAt: format(new Date(record.createdAt), "dd/MM/yyyy"),
    updatedAt: format(new Date(record.updatedAt), "dd/MM/yyyy"),
  }));

  prisma.$disconnect();

  return formattedData;
}

export async function fetchRecordById(id: string) {
  try {
    const recordById = await prisma.equipmentManagement_TB.findUnique({
      where: { id: id },
      include: {
        technician: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        user: true,
      },
    });

    return recordById;
  } catch (error) {
    console.error("Erro ao buscar registro por id: ", error);
  }
}

export async function fetchUserById(id: number) {
  try {
    const userById = await prisma.user_TB.findUnique({
      where: { id: id },
    });

    return userById;
  } catch (error) {
    console.error("Erro ao buscar o usuário pelo id: ", error);
  }
}

export async function fetchTechById(id: string) {
  try {
    const techById = await prisma.technician_TB.findUnique({
      where: { id: id },
    });

    return techById;
  } catch (error) {
    console.error("Erro ao buscar o técnico pelo id: ", error);
  }
}

export async function fetchCardData() {
  noStore();

  try {
    const numberOfAvailableMachine = await prisma.equipmentManagement_TB.count({
      where: {
        AND: [{ computerStatus: "available" }, { checkoutStatus: null }],
      },
    });
    const numberOfUnderMaintenanceMachine =
      await prisma.equipmentManagement_TB.count({
        where: { computerStatus: "underMaintenance" },
      });
    const totalCheckIn = await prisma.equipmentManagement_TB.count({
      where: { checkoutStatus: null },
    });
    const totalCheckOut = await prisma.equipmentManagement_TB.count({
      where: { checkoutStatus: true },
    });

    await prisma.$disconnect();

    return {
      numberOfAvailableMachine,
      numberOfUnderMaintenanceMachine,
      totalCheckIn,
      totalCheckOut,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function fetchLatestCheckInOut() {
  noStore();

  try {
    const latestCheckIn = await prisma.equipmentManagement_TB.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        technician: {
          select: {
            username: true,
            email: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const latestCheckOut = await prisma.equipmentManagement_TB.findFirst({
      where: {
        checkoutStatus: true,
      },
      orderBy: {
        checkOutDate: "desc",
      },
    });

    await prisma.$disconnect();

    return { latestCheckIn, latestCheckOut };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}
