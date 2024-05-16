"use server";

import { prisma } from "@/api/db";
import { AddFormTypes } from "@/lib/types/add-form-types";
import { revalidatePath } from "next/cache";
import { sendCheckInMail } from "./mailer";

export async function createRecord(formData: AddFormTypes) {
  try {
    await prisma.equipmentManagement_TB.create({
      data: formData,
    });
    revalidatePath("/computer-management");
    sendCheckInMail(formData);
    return true;
  } catch (error) {
    console.error(error);
    return false;
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
    console.error("Erro ao atualizar: ", error);
    return false;
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

// TODO:
// sendCheckInMail
// sendCheckOutMail
