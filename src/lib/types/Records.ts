// File: types/Records.ts

export interface Technician {
  id: string;
  username: string;
  email: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export type Location = "Matriz" | "SP" | "BH";
export const locations = ["Matriz", "SP", "BH"] as const;

export type ComputerType = "NTB" | "DSK" | "WKS";
export const computerTypes = {
  NTB: "Notebook",
  DSK: "Desktop",
  WKS: "Workstation",
} as const;

export type ComputerStatus = "available" | "underMaintenance" | "obsolete";
export const defaultStatus = {
  available: "Disponível",
  underMaintenance: "Em manutenção",
  obsolete: "Obsoleto",
} as const;

export interface Records {
  id: string;
  ticketNumber: string | number;
  recivedBy_tech_FK: string;
  hostname: string;
  patrimonyID: string | number;
  serviceTag?: string | null;
  serialNumber?: string | null;
  computerType: ComputerType | string;
  location: Location | string;
  computerStatus: ComputerStatus | string;
  broughtBy_user_FK: string | number;
  othersEquipment?: string | null;
  remarks?: string | null;
  checkInDate: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  givenBackBy_tech_FK?: string | null | Technician;
  WhoReceived_user_FK?: string | number | null | User;
  checkOutDate?: Date | string | null;
  checkoutStatus?: boolean | null;
  technician: Technician;
  user: User;
}
