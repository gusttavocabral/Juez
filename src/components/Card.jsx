import React from 'react';

const Card = ({ data }) => {
  const { entity, court, process, date, status, ai } = data;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Número copiado!');
  };

  return (
    <div className="glass" style={{
      padding: '1.5rem',
      borderRadius: 'var(--radius-lg)',
      marginLeft: '40px',
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      {/* Connector Dot */}
      <div style={{
        position: 'absolute',
        left: '-32px',
        top: '20px',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: 'white',
        border: '3px solid var(--primary)',
        boxShadow: '0 0 0 4px rgba(0, 106, 79, 0.1)'
      }} />

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary)', textTransform: 'uppercase' }}>
            {status}
          </span>
          <h3 style={{ margin: '0.25rem 0', fontSize: '1.125rem', color: 'var(--text-main)' }}>{entity}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{court} • {process}</p>
            <button 
              onClick={() => copyToClipboard(process)}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.75rem', padding: 0 }}>
              [Copiar nº]
            </button>
            <a 
              href={`https://www.google.com/search?q=consulta+processo+${process}+${court}`} 
              target="_blank" 
              style={{ fontSize: '0.75rem', color: 'var(--secondary)', textDecoration: 'none' }}>
              [Ver no Tribunal]
            </a>
          </div>
        </div>
        <time style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{date}</time>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
        <div style={{ background: 'rgba(0, 0, 0, 0.02)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>RESUMO CURTO</p>
          <p style={{ fontSize: '0.925rem' }}>{ai.summary}</p>
        </div>
        <div style={{ background: 'rgba(0, 0, 0, 0.02)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TRADUÇÃO JURÍDICA</p>
          <p style={{ fontSize: '0.925rem' }}>{ai.translation}</p>
        </div>
        <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: 'var(--radius-md)', color: 'white' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: '700', opacity: 0.8, marginBottom: '0.5rem' }}>IMPACTO PRÁTICO</p>
          <p style={{ fontSize: '0.925rem' }}>{ai.impact}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
