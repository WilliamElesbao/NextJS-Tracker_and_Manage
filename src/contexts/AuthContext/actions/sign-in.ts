"use server";

import { prisma } from "@/app/api/db";
import { LoginData } from "@/lib/types/LoginData";
import jwt, { Secret } from "jsonwebtoken";

export async function authSignIn(signInData: LoginData) {
  try {
    const technician = await prisma.technician_TB.findUnique({
      where: {
        username: signInData.username,
        password: signInData.password,
      },
    });

    if (!technician) {
      return false;
    }

    const secretKey = process.env.SECRET_KEY as Secret;
    const tokenJWTWithSessionData: jwt.Secret = jwt.sign(
      {
        id: technician.id,
        username: technician.username,
        email: technician.email,
      },
      secretKey,
      { expiresIn: "1h", algorithm: "HS256" },
    );

    return tokenJWTWithSessionData;
  } catch (error) {
    console.error("Erro ao realizar a autenticação", error);
  }
}
