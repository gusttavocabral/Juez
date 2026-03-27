export const summarizeMovement = async (text) => {
  const apiKey = localStorage.getItem('GEMINI_API_KEY');
  if (!apiKey) return null;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const prompt = `
    Você é um especialista jurídico brasileiro focado em acessibilidade. Seu papel é traduzir movimentações de processos judiciais para leigos.
    
    TEXTO DA MOVIMENTAÇÃO: "${text}"
    
    REGRAS:
    1. Responda SEMPRE em 3 blocos bem definidos: **Resumo curto**, **Tradução jurídica** e **Impacto prático**.
    2. Linguagem simples, sem juridiquês.
    3. Retorne apenas um formato JSON válido:
    {
      "summary": "...",
      "translation": "...",
      "impact": "..."
    }
  `;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    return JSON.parse(resultText.replace(/```json|```/g, ''));
  } catch (e) {
    console.error('Erro na IA:', e);
    return null;
  }
};
