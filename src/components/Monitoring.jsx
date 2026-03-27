import React, { useState } from 'react';

const Monitoring = () => {
  const [entities, setEntities] = useState([
    { id: 1, type: 'CPF', value: '***.456.***-01', label: 'J. Silva' },
    { id: 2, type: 'CNPJ', value: '12.345.678/0001-90', label: 'Empresa ABC' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [inputLabel, setInputLabel] = useState('');

  const addEntity = () => {
    if (!inputValue) return;
    const newEntity = {
      id: Date.now(),
      type: inputValue.length > 11 ? 'CNPJ' : 'CPF',
      value: inputValue,
      label: inputLabel || 'Sem nome'
    };
    setEntities([...entities, newEntity]);
    setInputValue('');
    setInputLabel('');
  };

  const removeEntity = (id) => {
    setEntities(entities.filter(e => e.id !== id));
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 0.5rem' }}>
          Meus Monitoramentos
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Adicione CPFs ou CNPJs para receber atualizações automáticas.</p>
      </header>

      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>CPF OU CNPJ</label>
          <input 
            type="text" 
            placeholder="000.000.000-00" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--glass-bg)' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>APELIDO (EX: MEU CPF)</label>
          <input 
            type="text" 
            placeholder="Nome para identificar" 
            value={inputLabel}
            onChange={(e) => setInputLabel(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--glass-bg)' }}
          />
        </div>
        <button 
          onClick={addEntity}
          style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
          Adicionar
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {entities.map(e => (
          <div key={e.id} className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.25rem' }}>{e.type}</p>
              <h4 style={{ margin: 0, fontSize: '1.125rem' }}>{e.label}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{e.value}</p>
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
