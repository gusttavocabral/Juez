export const fetchProcessesFromDatajud = async (document) => {
  const apiKey = localStorage.getItem('DATAJUD_API_KEY');
  if (!apiKey) return [];

  const cleanDocument = document.replace(/\D/g, '');
  
  const courts = [
    'tjsp', 'trf3', 'trf1', 'tjrj', 'tjmg', 'stj', 'stf'
  ]; 

  const searchInCourt = async (court) => {
    const url = `https://api-publica.datajud.cnj.jus.br/api_publica_${court}/_search`;
    
    // Usando CORS Proxy para evitar bloqueio no Vercel/Navegador
    const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
    
    const query = {
      "query": { "match": { "identificadorExterno": cleanDocument } },
      "size": 50
    };

    try {
      const response = await fetch(proxiedUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `APIKey ${apiKey}`
        },
        body: JSON.stringify(query)
      });

      if (!response.ok) return [];

      const data = await response.json();
      return data.hits?.hits?.map(hit => {
        const source = hit._source;
        const lastMove = source.movimentacoes?.[0]?.descricao?.toLowerCase() || '';
        const isFinished = lastMove.includes('arquivado') || lastMove.includes('baixa') || lastMove.includes('baixa definitiva');
        
        return {
          ...source,
          tribunal: court.toUpperCase(),
          status_limpo: isFinished ? 'Finalizado' : 'Ativo'
        };
      }) || [];
    } catch (e) {
      console.error(`Erro no tribunal ${court}:`, e);
      return [];
    }
  };

  const results = await Promise.all(courts.map(court => searchInCourt(court)));
  return results.flat();
};

export const getProcessCounts = async (document) => {
  const processes = await fetchProcessesFromDatajud(document);
  if (!processes) return { active: 0, total: 0 };
  const active = processes.filter(p => p.status_limpo === 'Ativo').length;
  const total = processes.length;
  return { active, total };
};
