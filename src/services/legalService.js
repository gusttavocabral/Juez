export const fetchProcessesFromDatajud = async (document) => {
  const apiKey = localStorage.getItem('DATAJUD_API_KEY');
  if (!apiKey) {
    console.warn('Datajud: Nenhuma chave API encontrada no localStorage.');
    return [];
  }

  // Lista de tribunais comuns para tentar a busca (Datajud exige endpoint por tribunal)
  const courts = ['tjsp', 'trf3', 'trf1', 'tjrj', 'tjmg']; 
  const cleanDocument = document.replace(/\D/g, '');
  
  console.log(`Datajud: Iniciando busca para o documento: ${cleanDocument}`);

  const searchInCourt = async (court) => {
    const url = `https://api-publica.datajud.cnj.jus.br/api_publica_${court}/_search`;
    const query = {
      "query": {
        "match": {
          "identificadorExterno": cleanDocument
        }
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `APIKey ${apiKey}`
        },
        body: JSON.stringify(query)
      });

      if (!response.ok) {
        console.error(`Datajud [${court}]: Erro na resposta (${response.status})`);
        return [];
      }

      const data = await response.json();
      console.log(`Datajud [${court}]: Encontrados ${data.hits?.total?.value || 0} processos.`);
      return data.hits?.hits?.map(hit => ({ ...hit._source, tribunal: court.toUpperCase() })) || [];
    } catch (e) {
      console.error(`Datajud [${court}]: Falha na requisição. Verifique se há erro de CORS no navegador.`, e);
      return [];
    }
  };

  // Tenta em todos os tribunais da lista
  const results = await Promise.all(courts.map(court => searchInCourt(court)));
  return results.flat();
};
