import React, { useState, useEffect } from 'react';
import Card from './Card';
import { fetchProcessesFromDatajud } from '../services/legalService';
import { summarizeMovement } from '../services/aiService';

const Feed = () => {
  const [movements, setMovements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRealData();
  }, []);

  const loadRealData = async () => {
    const savedEntities = JSON.parse(localStorage.getItem('MONITORED_ENTITIES') || '[]');
    if (savedEntities.length === 0) {
      setError('Adicione documentos na aba de Monitoramento para começar.');
      return;
    }

    setIsLoading(true);
    let allMovements = [];

    try {
      for (const entity of savedEntities) {
        const processes = await fetchProcessesFromDatajud(entity.value);
        
        for (const proc of processes) {
          // Pega a última movimentação para resumir
          const lastMovement = proc.movimentacoes?.[0];
          if (lastMovement) {
            const aiResult = await summarizeMovement(lastMovement.descricao);
            
            allMovements.push({
              id: proc.numeroProcesso,
              entity: entity.label,
              court: proc.tribunal,
              process: proc.numeroProcesso,
              date: new Date(lastMovement.dataHora).toLocaleString(),
              status: lastMovement.descricao,
              ai: aiResult || {
                summary: lastMovement.descricao,
                translation: 'Tradução não disponível. Configure sua chave Gemini.',
                impact: 'Verifique os detalhes no tribunal.'
              }
            });
          }
        }
      }
      setMovements(allMovements);
    } catch (e) {
      setError('Erro ao carregar dados. Verifique suas chaves de API.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 0.5rem', letterSpacing: '-0.025em' }}>
            Timeline Juez
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Dados reais consultados via Datajud.</p>
        </div>
        <button 
          onClick={loadRealData}
          disabled={isLoading}
          style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--radius-md)', 
            border: 'none', 
            background: 'var(--glass-bg)', 
            color: 'var(--primary)',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
          {isLoading ? 'Atualizando...' : '🔄 Atualizar'}
        </button>
      </header>

      {error && (
        <div className="glass" style={{ padding: '1rem', color: '#ef4444', borderRadius: 'var(--radius-md)' }}>
          {error}
        </div>
      )}

      {isLoading && movements.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <p>Consultando tribunais brasileiros...</p>
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '20px',
            top: '40px',
            bottom: '20px',
            width: '2px',
            background: 'var(--border-color)',
            zIndex: 0
          }} />

          {movements.map((m) => (
            <Card key={m.id} data={m} />
          ))}
      </div>
    </div>
  );
};

export default Feed;
