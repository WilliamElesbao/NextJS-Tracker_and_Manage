import { z } from "zod";

export const formSchema = z.object({
  ticketNumber: z.coerce
    .number({ message: "Informe o número do chamado" })
    .refine((val) => val >= 10000 && val <= 999999, {
      message: "O número do chamado deve ter entre 5 e 6 dígitos",
    }),

  hostname: z
    .string({ message: "Informe o hostname" })
    .min(6, { message: "Min 6 chars" })
    .max(15, { message: "Max 15 chars" }),

  patrimonyID: z.coerce
    .number({ message: "Informe o número de patrimônio" })
    .refine((val) => val >= 10000 && val <= 999999, {
      message: "O número do chamado deve ter entre 5 e 6 dígitos",
    }),

  computerType: z.enum(["NTB", "DSK", "WKS"], {
    message: "Selecione o tipo da máquina",
  }),

  serviceTag: z.optional(z.string()),

  serialNumber: z.optional(z.string()),

  location: z.enum(["Matriz", "SP", "BH"], {
    message: "Selecione a localização",
  }),

  computerStatus: z.enum(["underMaintenance", "available", "obsolete"], {
    message: "Selecione um status",
  }),

  othersEquipment: z.optional(z.string()),
  remarks: z.optional(z.string()),

  broughtBy_user_FK: z.coerce.number({
    message: "Informe o usuário que entregou a máquina",
  }),

  recivedBy_tech_FK: z.string(),
  checkInDate: z.date({ required_error: "Selecione a data de entrada" }),

  // to check out

  // TODO: CHECKOUT VALIDATION

  // givenBackBy_tech_FK: z
  //   .string()
  //   .min(1, { message: "TODO: VALIDATION USING ZOD" }),
  // WhoReceived_user_FK: z
  //   .string()
  //   .min(1, { message: "TODO: VALIDATION USING ZOD" }),
  // checkOutDate: z.string().min(1, { message: "TODO: VALIDATION USING ZOD" }),
  // checkoutStatus: z.string().min(1, { message: "TODO: VALIDATION USING ZOD" }),
});
