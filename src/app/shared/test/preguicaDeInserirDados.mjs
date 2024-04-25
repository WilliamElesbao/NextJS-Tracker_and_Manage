async function makePostRequests() {
  const url = "http://localhost:3000/api/computermanagement/";

  for (let i = 11000; i <= 11100; i++) {
    // Gerar um valor único para o campo específico
    const patrimony = i;

    // Dados para a solicitação POST
    const data = {
      broughtBy_user_FK: 1,
      handedoverDate: null,
      recivedBy_tech_FK: "cf5c6765-472c-474e-8156-b4c9c34d66a0",
      givenbackDate: null,
      ticketNumber: 12345,
      hostname: `TM-NTB-${patrimony}`,
      patrimonyID: patrimony,
      computerType: "PINEAPPLE",
      serviceTag: `ST${patrimony}`,
      location: "matriz",
      computerStatus: "obsolete",
      othersEquipment: "notebook, headset",
      remarks: "headset funcionando só de um lado",
    };

    // Realizar a solicitação POST
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    // Verifique a resposta se necessário
    if (response.ok) {
      console.log(`Solicitação POST ${i} foi bem-sucedida.`);
    } else {
      console.error(`Erro na solicitação POST ${i}:`, response.statusText);
    }
  }
}

// Chamar a função para fazer 50 solicitações POST
makePostRequests();
