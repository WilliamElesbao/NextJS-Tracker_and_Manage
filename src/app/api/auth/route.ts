// import { prisma } from "@/app/api/db";
// import jwt, { Secret } from "jsonwebtoken";
// import { LoginData } from "@/lib/types/LoginData";

// export async function POST(req: Request) {
//   try {
//     const userLoginData: LoginData = await req.json();

//     if (!userLoginData.username.trim() || !userLoginData.password) {
//       return Response.json(
//         { message: "Missing credentials!" },
//         { status: 400 },
//       );
//     }

//     const technician = await prisma.technician_TB.findUnique({
//       where: {
//         username: userLoginData.username,
//         password: userLoginData.password,
//       },
//     });

//     if (!technician) {
//       return Response.json(
//         { message: "Invalid credentials!" },
//         { status: 401 },
//       );
//     }

//     const secretKey = process.env.SECRET_KEY as Secret;
//     const tokenJWTWithSessionData: jwt.Secret = jwt.sign(
//       {
//         id: technician.id,
//         username: technician.username,
//         email: technician.email,
//       },
//       secretKey,
//       { expiresIn: "1h", algorithm: "HS256" },
//     );

//     return Response.json(
//       { message: "Successful Authentication!", tokenJWTWithSessionData },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("[api/auth/route.ts]:\nErro ao buscar os usuários: ", error);
//     return Response.json(
//       { error: "[api/auth/route.ts]:\nErro ao buscar os usuários" },
//       { status: 500 },
//     );
//   }
// }
