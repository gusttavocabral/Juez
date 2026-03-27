import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [apiKey, setApiKey] = useState('');
  const [datajudKey, setDatajudKey] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('GEMINI_API_KEY');
    const savedDatajud = localStorage.getItem('DATAJUD_API_KEY');
    if (savedKey) setApiKey(savedKey);
    if (savedDatajud) setDatajudKey(savedDatajud);
  }, []);

  const saveKey = () => {
    localStorage.setItem('GEMINI_API_KEY', apiKey);
    localStorage.setItem('DATAJUD_API_KEY', datajudKey);
    alert('Configurações salvas localmente!');
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 0.5rem', letterSpacing: '-0.025em' }}>
          Configurações de APIs
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Configure suas chaves para habilitar as buscas reais e IA.</p>
      </header>

      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem' }}>GOOGLE AI STUDIO (GEMINI)</label>
          <input 
            type="password" 
            placeholder="AIza..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--glass-bg)', color: 'var(--text-main)' }}
          />
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Obtenha sua chave gratuita em <a href="https://aistudio.google.com/app/apikey" target="_blank" style={{ color: 'var(--primary)' }}>Google AI Studio</a>.
          </p>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem' }}>CNJ DATAJUD (API KEY)</label>
          <input 
            type="password" 
            placeholder="Public Key do CNJ..." 
            value={datajudKey}
            onChange={(e) => setDatajudKey(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--glass-bg)', color: 'var(--text-main)' }}
          />
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            A chave do Datajud é gratuita e pode ser solicitada no <a href="https://comunidade.datajud.cnj.jus.br/" target="_blank" style={{ color: 'var(--primary)' }}>Fórum do CNJ.</a>
          </p>
        </div>

        <button 
          onClick={saveKey}
          style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer', alignSelf: 'flex-start' }}>
          Salvar Configurações
        </button>
      </div>

      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.05)' }}>
        <h4 style={{ margin: '0 0 0.5rem', color: 'var(--secondary)' }}>Privacidade e Custo</h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>
          Suas chaves ficam salvas apenas localmente no seu navegador. Nenhuma informação é enviada para servidores externos além das APIs oficiais.
        </p>
      </div>
    </div>
  );
};

export default Settings;
