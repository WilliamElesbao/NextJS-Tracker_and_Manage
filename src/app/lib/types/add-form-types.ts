export interface AddFormTypes {
  hostname: string;
  ticketNumber: number;
  patrimonyID: number;
  computerType: "NTB" | "DSK" | "WKS";
  serviceTag: string | null;
  serialNumber: string | null;
  location: "Matriz" | "SP" | "BH";
  computerStatus: "Under Maintenance" | "Available" | "Obsolete";
  othersEquipment: string;
  remarks: string;
  broughtBy_user_FK: number;
  recivedBy_tech_FK: string;
  checkInDate: Date;
}
