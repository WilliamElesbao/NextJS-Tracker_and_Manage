interface Technician {
  id: string;
  username: string;
  email: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export interface Records {
  // to check in
  id: string;
  ticketNumber: string | number;
  recivedBy_tech_FK: string;
  hostname: string;
  patrimonyID: string | number;
  serviceTag?: string | null;
  serialNumber?: string | null;
  computerType: "NTB" | "DSK" | "WKS";
  location: "Matriz" | "SP" | "BH";
  computerStatus: "Available" | "Under Maintenance" | "Obsolete";
  broughtBy_user_FK: string | number;
  othersEquipment?: string | null;
  remarks?: string | null;
  checkInDate: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;

  // to check out
  givenBackBy_tech_FK?: string | null;
  WhoReceived_user_FK?: string | number | null;
  checkOutDate?: Date | string | null;
  checkoutStatus?: boolean | null;

  technician: Technician;
  user: User;
}
