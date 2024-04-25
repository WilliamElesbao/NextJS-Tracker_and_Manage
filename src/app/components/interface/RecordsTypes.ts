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
  id: string;
  broughtBy_user_FK: number;
  handedoverDate: string | null;
  recivedBy_tech_FK: string;
  givenbackDate: string | null;
  ticketNumber: number;
  hostname: string;
  patrimonyID: number;
  computerType: string;
  serviceTag: string | null;
  serialNumber: string | null;
  location: string;
  computerStatus: string;
  othersEquipment: string;
  remarks: string;
  CreatedAt: string;
  UpdatedAt: string;
  technician: Technician;
  user: User;
}
