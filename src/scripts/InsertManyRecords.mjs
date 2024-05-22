async function makePostRequests() {
  const url = "http://localhost:3000/api/computermanagement/";

  for (let i = 11000; i <= 11012; i++) {
    const patrimony = i;

    const data = {
      ticketNumber: i,
      // recivedBy_tech_FK: "cf5c6765-472c-474e-8156-b4c9c34d66a0",
      recivedBy_tech_FK: "6b31dfe2-db1c-47be-a0e9-4f3aa9dbdf17",
      hostname: `TM-NTB-${patrimony}`,
      patrimonyID: patrimony,
      serviceTag: `ST-NTB-0${i}`,
      serialNumber: null,
      computerType: "NTB",
      location: "Matriz",
      computerStatus: "available",
      // broughtBy_user_FK: 1,
      broughtBy_user_FK: 2,
      othersEquipment: "",
      remarks: "",
      checkInDate: new Date(),
      givenBackBy_tech_FK: null,
      WhoReceived_user_FK: null,
      checkOutDate: null,
      checkoutStatus: null,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(`Solicitação POST ${i} foi bem-sucedida.`);
    } else {
      console.error(`Erro na solicitação POST ${i}:`, response.statusText);
    }
  }
}

makePostRequests();
