export const fetchProcessesFromEscavador = async (document) => {
  const token = localStorage.getItem('ESCAVADOR_API_KEY');
  if (!token) return [];

  const url = `https://api.escavador.com/v1/busca-processo?documento=${document.replace(/\D/g, '')}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    const data = await response.json();
    return data.items || [];
  } catch (e) {
    console.error('Erro no Escavador:', e);
    return [];
  }
};
