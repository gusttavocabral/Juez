import React, { useState, useEffect } from 'react';
import { getProcessCounts } from '../services/legalService';

const Monitoring = () => {
  const [entities, setEntities] = useState(() => {
    const saved = localStorage.getItem('MONITORED_ENTITIES');
    return saved ? JSON.parse(saved) : [
      { id: 1, type: 'CPF', value: '***.456.***-01', label: 'J. Silva', counts: { active: 0, total: 0 } },
      { id: 2, type: 'CNPJ', value: '12.345.678/0001-90', label: 'Empresa ABC', counts: { active: 0, total: 0 } }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [inputLabel, setInputLabel] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('MONITORED_ENTITIES', JSON.stringify(entities));
    // Tenta carregar as contagens para as entidades existentes
    updateAllCounts();
  }, [entities.length]);

  const updateAllCounts = async () => {
    const newEntities = [...entities];
    let changed = false;
    for (let e of newEntities) {
      if (!e.counts || (e.counts.active === 0 && e.counts.total === 0)) {
        const c = await getProcessCounts(e.value);
        e.counts = c;
        changed = true;
      }
    }
    if (changed) setEntities(newEntities);
  };

  const fetchEntityInfo = async (value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length === 14) { // CNPJ
      try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanValue}`);
        const data = await response.json();
        return data.razao_social || data.nome_fantasia || 'Empresa Localizada';
      } catch (e) {
        return 'Empresa (Dados não encontrados)';
      }
    }
    return null; // CPF
  };

  const addEntity = async () => {
    if (!inputValue) return;
    setIsLoading(true);
    
    const foundLabel = await fetchEntityInfo(inputValue);
    const counts = await getProcessCounts(inputValue);
    
    const newEntity = {
      id: Date.now(),
      type: inputValue.replace(/\D/g, '').length > 11 ? 'CNPJ' : 'CPF',
      value: inputValue,
      label: foundLabel || inputLabel || 'Documento Validado',
      counts: counts
    };
    
    setEntities([...entities, newEntity]);
    setInputValue('');
    setInputLabel('');
    setIsLoading(false);
  };

  const removeEntity = (id) => {
    setEntities(entities.filter(e => e.id !== id));
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 0.5rem', letterSpacing: '-0.025em' }}>
          Meus Monitoramentos
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Os dados de CNPJ são puxados automaticamente da base da Receita Federal.</p>
      </header>

      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>CPF OU CNPJ</label>
          <input 
            type="text" 
            placeholder="Digite apenas números..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--glass-bg)', color: 'var(--text-main)', fontSize: '1rem' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>APELIDO (OPCIONAL)</label>
          <input 
            type="text" 
            placeholder="Ex: Minha Empresa" 
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--glass-bg)', color: 'var(--text-main)', fontSize: '1rem' }}
          />
        </div>
        <button 
          onClick={addEntity}
          disabled={isLoading}
          style={{ 
            padding: '1rem 2rem', 
            borderRadius: 'var(--radius-md)', 
            border: 'none', 
            background: 'var(--primary)', 
            color: 'white', 
            fontWeight: '700', 
            cursor: 'pointer',
            transition: 'opacity 0.2s',
            opacity: isLoading ? 0.5 : 1
          }}>
          {isLoading ? 'Buscando...' : 'Monitorar'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {entities.map(e => (
          <div key={e.id} className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.25rem' }}>{e.type}</p>
              <h4 style={{ margin: 0, fontSize: '1.125rem' }}>{e.label}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{e.value}</p>
              
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <div>
                  <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: '700' }}>ATIVOS</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '800', color: '#16a34a' }}>{e.counts?.active || 0}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', fontWeight: '700' }}>TOTAL</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>{e.counts?.total || 0}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => removeEntity(e.id)}
              style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.875rem' }}>
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Monitoring;
