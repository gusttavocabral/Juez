import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('GEMINI_API_KEY');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const saveKey = () => {
    localStorage.setItem('GEMINI_API_KEY', apiKey);
    alert('Chave salva localmente com sucesso!');
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 0.5rem' }}>
          Configurações Pessoais
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Configure suas chaves de API para uso gratuito e local.</p>
      </header>

      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>GOOGLE AI STUDIO (GEMINI API KEY)</label>
          <input 
            type="password" 
            placeholder="Cole sua chave aqui..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--glass-bg)' }}
          />
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Sua chave fica salva apenas no seu navegador (LocalStorage). 
            <a href="https://aistudio.google.com/app/apikey" target="_blank" style={{ color: 'var(--primary)', marginLeft: '4px' }}>Obter chave gratuita aqui.</a>
          </p>
        </div>

        <button 
          onClick={saveKey}
          style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer', alignSelf: 'flex-start' }}>
          Salvar Configurações
        </button>
      </div>

      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', background: 'rgba(99, 102, 241, 0.05)' }}>
        <h4 style={{ margin: '0 0 0.5rem', color: 'var(--secondary)' }}>Por que usar minha própria chave?</h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>
          Como este é um app pessoal, usar sua própria API Key garante que você tenha acesso ilimitado e gratuito (dentro dos limites do Google) sem depender de um servidor central pago.
        </p>
      </div>
    </div>
  );
};

export default Settings;
