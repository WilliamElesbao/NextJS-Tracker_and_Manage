async function makePostRequests() {
  const url = "http://localhost:3000/api/computermanagement/";

  for (let i = 11000; i <= 11010; i++) {
    const patrimony = i;

    const data = {
      broughtBy_user_FK: 1,
      handedoverDate: null,
      recivedBy_tech_FK: "cf5c6765-472c-474e-8156-b4c9c34d66a0",
      givenbackDate: null,
      ticketNumber: 12345,
      hostname: `TM-NTB-${patrimony}`,
      patrimonyID: patrimony,
      computerType: "DSK",
      serviceTag: `ST${patrimony}`,
      location: "Matriz",
      computerStatus: "Obsolete",
      othersEquipment: "notebook, headset",
      remarks: "headset funcionando só de um lado",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      console.log(`Solicitação POST ${i} foi bem-sucedida.`);
    } else {
      console.error(`Erro na solicitação POST ${i}:`, response.statusText);
    }
  }
}

makePostRequests();
