import { z } from "zod";

export const formSchema = z.object({
  hostname: z
    .string()
    .min(6, { message: "Min 6 chars" })
    .max(15, { message: "Max 15 chars" }),
  patrimonyID: z.coerce.number().positive({ message: "Patrimony is invalid" }),
  ticketNumber: z.coerce
    .string()
    .min(6, { message: "Min 6 chars" })
    .max(8, { message: "Max 8 chars" }),
  computerType: z.enum(["", "NTB", "DSK", "WKS"]),
  serviceTag: z.optional(z.string()),
  serialNumber: z.optional(z.string()),
  location: z.enum(["", "Matriz", "SP", "BH"]),
  computerStatus: z.enum([
    "",
    "Under Maintenance",
    "Available for use",
    "Obsolete",
  ]),
  othersEquipment: z.optional(z.string()),
  remarks: z.optional(z.string()),
  broughtBy_user_FK: z.coerce.number(),
  recivedBy_tech_FK: z.optional(z.string()),
  givenbackDate: z.optional(z.string()),
  handedoverDate: z.optional(z.string()),
});
