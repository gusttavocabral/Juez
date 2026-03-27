import React, { useState, useEffect } from 'react';
import Card from './Card';
import { fetchProcessesFromDatajud } from '../services/legalService';
import { fetchProcessesFromEscavador } from '../services/escavadorService';
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
        // Busca em ambas as fontes simultaneamente
        const [datajudResults, escavadorResults] = await Promise.all([
          fetchProcessesFromDatajud(entity.value),
          fetchProcessesFromEscavador(entity.value)
        ]);
        
        const combinedProcesses = [...datajudResults, ...escavadorResults];

        for (const proc of combinedProcesses) {
          // Identifica a última movimentação (Lógica varia por API)
          const lastMovement = proc.movimentacoes?.[0] || proc.ultima_movimentacao;
          if (lastMovement) {
            const desc = lastMovement.descricao || lastMovement.texto || 'Movimentação detectada';
            const aiResult = await summarizeMovement(desc);
            
            allMovements.push({
              id: proc.numeroProcesso || proc.numero_processo,
              entity: entity.label,
              court: proc.tribunal || proc.orgao_julgador || 'Tribunal',
              process: proc.numeroProcesso || proc.numero_processo,
              date: new Date(lastMovement.dataHora || lastMovement.data).toLocaleString(),
              status: desc,
              ai: aiResult || {
                summary: desc,
                translation: 'Configure sua chave Gemini para tradução automática.',
                impact: 'Verifique no tribunal para detalhes.'
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
        <div className="glass" style={{ padding: '1.5rem', color: '#ef4444', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)' }}>
          <h4 style={{ margin: '0 0 0.5rem' }}>Opa! Algo deu errado:</h4>
          <p style={{ fontSize: '0.875rem' }}>{error}</p>
          <p style={{ fontSize: '0.75rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
            Dica: Abra o console do navegador (F12) para ver os detalhes técnicos. Pode ser um erro de CORS ou chave inválida.
          </p>
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
