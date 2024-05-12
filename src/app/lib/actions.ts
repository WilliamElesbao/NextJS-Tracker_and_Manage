"use server";

import { prisma } from "@/app/api/db";
import { revalidatePath } from "next/cache";
import { AddFormTypes } from "@/app/lib/types/add-form-types";

export async function createRecord(formData: AddFormTypes) {
  try {
    await prisma.equipmentManagement_TB.create({
      data: formData,
    });
    revalidatePath("/computer-management");
    return true;
  } catch (error) {
    console.error(error);
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
