import { prisma } from "@/app/api/db";
import {
  ComputerStatus,
  ComputerType,
  Location,
} from "@/app/lib/types/RecordsTypes";
import { format } from "date-fns";

export async function fetchAllRecords() {
  const recordsFromServer = await prisma.equipmentManagement_TB.findMany({
    include: {
      technician: { select: { id: true, username: true, email: true } },
      user: true,
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

  return formattedData;
}
