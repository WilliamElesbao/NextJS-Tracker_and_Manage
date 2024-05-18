"use server";

import { prisma } from "@/app/api/db";
import { format } from "date-fns";
import { createTransport } from "nodemailer";
import { fetchTechById } from "./data";

const transporter = createTransport({
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

type AttributesTemplateMail = {
  title: string;
  subtitle: string;
  hostname: string;
  date: string;
  ticketNumber: string;
  checkInDate: string;
  patrimonyID: string;
  serviceTag?: any;
  serialNumber?: any;
  computerType: string;
  location: string;
  broughtBy: string;
  broughtBy_email: string;
  recivedBy: string;
  recivedBy_email: string;
  othersEquipment: string;
  remarks: string;
};

function generateEmailTemplate({
  title,
  subtitle,
  hostname,
  date,
  ticketNumber,
  checkInDate,
  patrimonyID,
  serviceTag,
  serialNumber,
  computerType,
  location,
  broughtBy,
  broughtBy_email,
  recivedBy,
  recivedBy_email,
  othersEquipment,
  remarks,
}: AttributesTemplateMail) {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        color: #fff;
      }

      body {
        color: #fff;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      h1,
      h2,
      h3 {
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
        margin-top: 2rem;
        font-size: 0.8rem;
        opacity: 0.7;
      }
      .card {
        background-color: #000;
        background: linear-gradient(to bottom, rgb(0, 0, 0), rgb(34, 34, 34));
        border-radius: 1rem;
        display: flex;
        position: relative;
        width: 20rem;
        height: auto;
        padding: 1rem;
        margin: 0 auto;
      }

      .card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 1rem 1rem 0 0;
        padding: 0.15rem;
        background: linear-gradient(to bottom, white, black);
        -webkit-mask: linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
      }

      .card > .logo {
        background-color: rgb(0, 0, 0);
        border: rgb(65, 65, 65) 1px solid;
        position: absolute;
        z-index: 10;
        top: -2.5rem;
        left: 50%;
        transform: translateX(-50%);
        width: 5rem;
        height: 5rem;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        color: rgb(70, 70, 70);
      }
      .content > span {
        font-size: 0.85rem;
        color: rgb(124, 123, 123);
      }
      .content > .hostname {
        font-size: 1rem;
        color: white;
      }
      .card .content {
        display: inline-block;
        gap: 0.7rem;
        position: relative;
        border-radius: 1rem 1rem 0 0;
        padding-top: 2rem;
      }

      .data-grid {
        display: inline-block;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .labels {
        display: block;
        font-weight: bold;
        font-size: 0.85rem;
        text-align: start;
        margin-top: 2rem;
      }
      .values {
        display: block;
        flex-direction: column;
        font-size: 0.85rem;
        text-align: start;
        margin-top: 2rem;
      }
      .date {
        display: block;
        gap: 1rem;
        position: absolute;
        bottom: 0.25rem;
      }
      .date > label {
        font-weight: bold;
        font-size: 0.85rem;
      }
      .date > span {
        font-size: 0.85rem;
      }
      label, span{
        margin-bottom: 1rem ;
      }
    </style>
  </head>
  <body>
    <!-- Quem entregou, quando entregou o que entregou e quem recebeu -->
    <div
      style="
        text-align: start;
        background-color: #000;
        padding: 1.5rem;
        width: 500px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 1);
      "
    >
      <p style="font-size: 1.25rem">${title}</p>
      <p style="font-size: 1.25rem">${subtitle}</p>
      <p style="font-size: 1.25rem">Máquina - ${hostname}</p>

      <div style="margin-top: 3rem; display: flex; width: 100%">
        <!-- info sobre a entrega -->
        <div class="card">
          <!-- <div class="logo">TM</div> -->
          <br />
          <div class="content">
            <span>Dados da entrega</span>
            <br />
            <span class="hostname">${hostname}</span>
            <br />
            <!-- <div class="line"></div> -->
            <div class="data-grid">
              <div class="labels">
                <label>SATI:</label>
                <span>${ticketNumber}</span>
                <br />

                <label>Entregue por:</label>
                <span>${broughtBy}</span>
                <br />

                <label>E-mail:</label>
                <span>${broughtBy_email}</span>
                <br />

                <label>Recebido por:</label>
                <span>${recivedBy}</span>
                <br />
                
                <label>E-mail:</label>
                <span>${recivedBy_email}</span>
                <br />

                <label>Hostname:</label>
                <span>${hostname}</span>

                <br />
                <label>Patrimônio:</label>
                <span>${patrimonyID}</span>
                <br />

                ${
                  serviceTag
                    ? `
                  <label>Service tag:</label>
                  <span>${serviceTag}</span>
                  <br />
                `
                    : ""
                }

                ${
                  serialNumber
                    ? `<label>Serial number:</label> <span>${serialNumber}</span> <br />`
                    : ""
                }

                <label>Tipo:</label>
                <span>${computerType}</span>

                <br />
                <label>Localização:</label>
                <span>${location}</span>

                <br />
                ${
                  othersEquipment
                    ? `
                <label>Equipamentos:</label>
                <span>${othersEquipment}</span>

                <br />`
                    : ""
                }
                ${
                  remarks
                    ? `
                <label>Observações:</label>
                <span>${remarks}</span>

                <br />
                `
                    : ""
                }
                
              </div>
            </div>
            <div class="date">
              <label>Entregue à TI em:</label>
              <span>${checkInDate}</span>
            </div>
          </div>
        </div>
      </div>
      <p class="footer">Tracker & Manage - ${new Date().getFullYear()}</p>
    </div>
  </body>
</html>
  `;
}

export const sendCheckInMail = async (formData: any) => {
  const recordByHostname = await prisma.equipmentManagement_TB.findUnique({
    where: { hostname: formData.hostname },
    include: {
      technician: { select: { username: true, email: true } },
      user: { select: { name: true, email: true } },
    },
  });

  const emailTemplate = generateEmailTemplate({
    title: "Tracker & Manage - Check-in",
    subtitle: "Check-in - TI",
    hostname: recordByHostname!.hostname,
    date: format(new Date(recordByHostname!.createdAt), "dd/MM/yyyy"),
    ticketNumber: String(recordByHostname!.ticketNumber),
    checkInDate: format(new Date(recordByHostname!.checkInDate), "dd/MM/yyyy"),
    patrimonyID: String(recordByHostname!.patrimonyID),
    serviceTag:
      recordByHostname?.serviceTag !== "null"
        ? recordByHostname?.serviceTag
        : null,
    serialNumber: recordByHostname?.serialNumber || null,
    computerType: recordByHostname!.computerType,
    location: recordByHostname!.location,
    broughtBy: recordByHostname!.user.name,
    broughtBy_email: recordByHostname!.user.email,
    recivedBy: recordByHostname!.technician.username,
    recivedBy_email: recordByHostname!.technician.email,
    othersEquipment: recordByHostname!.othersEquipment || "",
    remarks: recordByHostname!.remarks || "",
  });

  console.log(recordByHostname?.serviceTag);
  console.log(recordByHostname?.serialNumber);

  const info = await transporter.sendMail({
    from: { name: `Tracker & Manage`, address: process.env.EMAIL! },
    to: [recordByHostname!.technician.email],
    cc: [recordByHostname!.user.email],
    subject: `Tracker & Manage - Check-in - ${recordByHostname?.hostname}`,
    html: emailTemplate,
  });

  console.log("Check-in: Message sent: %s", info.messageId!);
};

export const sendCheckOutMail = async (id: any) => {
  const recordByHostname = await prisma.equipmentManagement_TB.findUnique({
    where: { id },
    include: {
      technician: { select: { username: true, email: true } },
      user: { select: { name: true, email: true } },
    },
  });

  const givenBackByTechId = await fetchTechById(
    recordByHostname?.givenBackBy_tech_FK!,
  );
  console.log(givenBackByTechId);

  const formData = {
    ...recordByHostname,
    givenBackBy_tech_FK: givenBackByTechId,
  };

  const emailTemplate = generateEmailTemplate({
    title: "Tracker & Manage - Check-Out",
    subtitle: "Check-Out - TI",
    hostname: recordByHostname!.hostname,
    date: format(new Date(recordByHostname!.createdAt), "dd/MM/yyyy"),
    ticketNumber: String(recordByHostname!.ticketNumber),
    checkInDate: format(new Date(recordByHostname!.checkInDate), "dd/MM/yyyy"),
    patrimonyID: String(recordByHostname!.patrimonyID),
    serviceTag: recordByHostname?.serviceTag || null,
    serialNumber: recordByHostname?.serialNumber || null,
    computerType: recordByHostname!.computerType,
    location: recordByHostname!.location,
    broughtBy: formData!.givenBackBy_tech_FK!.username!,
    broughtBy_email: formData!.givenBackBy_tech_FK!.email,
    recivedBy: recordByHostname!.user.name,
    recivedBy_email: recordByHostname!.user.email,
    othersEquipment: recordByHostname!.othersEquipment || "",
    remarks: recordByHostname!.remarks || "",
  });

  console.log(recordByHostname);

  const info = await transporter.sendMail({
    from: { name: `Tracker & Manage`, address: process.env.EMAIL! },
    to: [recordByHostname!.technician.email],
    cc: [recordByHostname!.user.email],
    subject: `Tracker & Manage - Check-out - ${recordByHostname?.hostname}`,
    html: emailTemplate,
  });

  console.log("Check-out: Message sent: %s", info.messageId);
};
