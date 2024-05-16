import { prisma } from "@/api/db";
import { format } from "date-fns";
import { createTransport } from "nodemailer";

// const nodemailer = require("nodemailer");

interface FormValues {}

// Gmail

// const transporter = nodemailer.createTransport({
//   service:`gmail`,
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: "william.elesbao.2000@gmail.com",
//     pass: "bkgu khpz uwss cjhe",
//   },
// });

const transporter = createTransport({
  // service: `gmail`
  host: "smtp-mail.outlook.com", // smtp.gmail.com
  port: 587,
  secure: false, // Use `true` for port 465, `false`
  auth: {
    user: "william.elesbao.2000@outlook.com", // william.elesbao.2000@gmail.com
    pass: "xsdodkdrnzjcoujx", // bkgu khpz uwss cjhe
  },
});

export const sendCheckInMail = async (formData: any) => {
  console.log(formData);

  const recordByHostname: any = await prisma.equipmentManagement_TB.findUnique({
    where: {
      hostname: formData.hostname,
    },
    include: {
      technician: {
        select: {
          username: true,
          email: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  console.log(recordByHostname);

  const info = await transporter.sendMail({
    from: {
      name: `Tracker & Manage`,
      address: "william.elesbao.2000@outlook.com",
    },
    to: [recordByHostname?.technician.email], // list of receivers
    subject: `Tracker & Manage - Check-in - ${recordByHostname?.hostname}`,
    cc: [recordByHostname?.user.email],
    // text: `
    // Entregue os itens:
    // Registro criado em: ${recordByHostname?.createdAt}\n
    // Data de entrada do computador: ${recordByHostname?.checkInDate}\n
    // Hostname da máquina: ${recordByHostname?.hostname}\n
    // Patrimônio da máquina: ${recordByHostname?.patrimonyID}\n
    // Usuário que entregou: ${recordByHostname?.user.name}\n
    // Técnico que recebeu: ${recordByHostname?.technician.username}\n

    // Itens entregues: ${recordByHostname?.othersEquipment}\n
    // Observações: ${recordByHostname?.remarks}\n
    // `,
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tracker & Manage - Check-in</title>
        <style>
          body {
            background-color: #000;
            color: #fff;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
    
          .container {
            background-color: #000;
            border-radius: 10px;
            padding: 20px;
            width: 90%;
            text-align: center;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
          }
    
          h1,h2,h3 {
            color: #fff;
          }
    
          .details {
            text-align: left;
            margin-top: 20px;
          }
    
          .details p {
            margin: 10px 0;
            color: #fff;
          }
    
          .footer {
            margin-top: 20px;
            font-size: 12px;
            opacity: 0.7;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Tracker & Manage</h1>
          <h2>Check-in - TI</h2>
          <h3>Entregue a máquina - ${recordByHostname?.hostname}</h3>
          <div class="details">
            
            <p><b>Registro criado em:</b> ${format(
              new Date(recordByHostname.createdAt),
              "dd/MM/yyyy",
            )}</p>
            <p><b>Número do SATI:</b> ${recordByHostname?.ticketNumber}</p>
            <p>
              <b>Data de entrada do computador:</b> ${format(
                new Date(recordByHostname.checkInDate),
                "dd/MM/yyyy",
              )}
            </p>
            <p><b>Hostname da máquina:</b> ${recordByHostname?.hostname}</p>
            <p><b>Patrimônio da máquina:</b> ${
              recordByHostname?.patrimonyID
            }</p>
            <p><b>Usuário que entregou:</b> ${recordByHostname?.user.name}</p>
            <p>
              <b>Técnico que recebeu:</b> ${
                recordByHostname?.technician.username
              }
            </p>
            <p><b>Itens entregues:</b> ${recordByHostname?.othersEquipment}</p>
            <p><b>Observações:</b> ${recordByHostname?.remarks}</p>
          </div>
          <p class="footer">Tracker & Manage - ${new Date().getFullYear()}</p>
        </div>
      </body>
    </html>
    

      `,
  });

  console.log("Message sent: %s", info.messageId);
};

export const sendCheckOutMail = async (id: any) => {
  console.log(id);

  const recordByHostname: any = await prisma.equipmentManagement_TB.findUnique({
    where: {
      id: id,
    },
    include: {
      technician: {
        select: {
          username: true,
          email: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  console.log(recordByHostname);

  const info = await transporter.sendMail({
    from: {
      name: `Tracker & Manage`,
      address: "william.elesbao.2000@outlook.com",
    },
    to: [recordByHostname?.technician.email], // list of receivers
    subject: `Tracker & Manage - Check-out - ${recordByHostname?.hostname}`,
    cc: [recordByHostname?.user.email],
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tracker & Manage - Check-out</title>
        <style>
          body {
            background-color: #000;
            color: #fff;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
    
          .container {
            background-color: #000;
            border-radius: 10px;
            padding: 20px;
            width: 90%;
            text-align: center;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
          }
    
          h1,h2,h3 {
            color: #fff;
          }
    
          .details {
            text-align: left;
            margin-top: 20px;
          }
    
          .details p {
            margin: 10px 0;
            color: #fff;
          }
    
          .footer {
            margin-top: 20px;
            font-size: 12px;
            opacity: 0.7;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Tracker & Manage</h1>
          <h2>Check-Out - TI</h2>
          <h3>Entregue a máquina - ${recordByHostname?.hostname} ao usuário ${
      recordByHostname.user.name
    }</h3>
          <div class="details">
            
            <p><b>Registro criado em:</b> ${format(
              new Date(recordByHostname.createdAt),
              "dd/MM/yyyy",
            )}</p>
            <p><b>Número do SATI:</b> ${recordByHostname?.ticketNumber}</p>
            <p>
              <b>Data de entrada do computador:</b> ${format(
                new Date(recordByHostname.checkInDate),
                "dd/MM/yyyy",
              )}
            </p>
            <p><b>Hostname da máquina:</b> ${recordByHostname?.hostname}</p>
            <p><b>Patrimônio da máquina:</b> ${
              recordByHostname?.patrimonyID
            }</p>
            <p><b>Usuário que entregou:</b> ${recordByHostname?.user.name}</p>
            <p>
              <b>Técnico que recebeu:</b> ${
                recordByHostname?.technician.username
              }
            </p>
            <p><b>Itens entregues:</b> ${recordByHostname?.othersEquipment}</p>
            <p><b>Observações:</b> ${recordByHostname?.remarks}</p>
          </div>
          <p class="footer">Tracker & Manage - ${new Date().getFullYear()}</p>
        </div>
      </body>
    </html>
    

      `,
  });

  console.log("Message sent: %s", info.messageId);
};

// sendEmail().catch(console.error);
// "willtube.tech@gmail.com",
// "william.elesbao.2000@gmail.com",
// "TM-NTB-011474, Data entrega: 14.05.2024, Tecnico que recebeu: willtubetech",
