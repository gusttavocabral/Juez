export const fetchProcessesFromDatajud = async (document) => {
  const apiKey = localStorage.getItem('DATAJUD_API_KEY');
  if (!apiKey) return [];

  // Exemplo para TJSP (O endpoint muda por tribunal no Datajud)
  const url = 'https://api-publica.datajud.cnj.jus.br/api_publica_tjsp/_search';
  
  const query = {
    "query": {
      "match": {
        "identificadorExterno": document.replace(/\D/g, '')
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
    const data = await response.json();
    return data.hits.hits.map(hit => hit._source);
  } catch (e) {
    console.error('Erro no Datajud:', e);
    return [];
  }
};
