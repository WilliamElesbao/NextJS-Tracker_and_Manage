"use server";

import { prisma } from "@/app/api/db";
import { sendCheckInMail } from "@/lib/mailer";
import { AddFormTypes } from "@/lib/types/add-form-types";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createRecord(formData: AddFormTypes) {
  try {
    await prisma.equipmentManagement_TB.create({
      data: formData,
    });
    revalidatePath("/computer-management");
    sendCheckInMail(formData);
    return true;
  } catch (error) {
    console.log("error:::", error.meta?.target[0]);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      let errorMessage = "";
      switch (error.meta?.target[0]) {
        case "hostname":
          errorMessage = "O hostname informado já foi registrado.";
          break;
        case "patrimonyID":
          errorMessage = "O número de patrimônio informado já foi registrado.";
          break;
        case "serviceTag":
          errorMessage = "A Service Tag informada já foi registrada.";
          break;
        case "serialNumber":
          errorMessage = "O Serial Number informado já foi registrado.";
          break;
        default:
          errorMessage =
            "O valor fornecido já existe. Por favor, forneça um valor único.";
      }
      return errorMessage;
    } else {
      console.error(error);
    }
  }
}

export async function updateRecord(id?: string, data?: any) {
  try {
    await prisma.equipmentManagement_TB.update({
      where: { id: id },
      data: data,
    });
    revalidatePath("/computer-management");
    return true;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      let errorMessage = "";
      switch (error.meta?.target) {
        case "EquipmentManagement_TB_hostname_key":
          errorMessage = "O hostname informado já foi registrado.";
          break;
        case "EquipmentManagement_TB_patrimonyID_key":
          errorMessage = "O número de patrimônio informado já foi registrado.";
          break;
        case "EquipmentManagement_TB_serviceTag_key":
          errorMessage = "A Service Tag informada já foi registrada.";
          break;
        case "EquipmentManagement_TB_serialNumber_key":
          errorMessage = "O Serial Number informado já foi registrado.";
          break;
        default:
          errorMessage =
            "O valor fornecido já existe. Por favor, forneça um valor único.";
      }
      return errorMessage;
    } else {
      console.error(error);
    }
  }
}

export async function deleteRecord(id: string) {
  try {
    await prisma.equipmentManagement_TB.delete({
      where: { id: id },
    });
    revalidatePath("/computer-management");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
