import React from 'react';
import Card from './Card';

const mockMovements = [
  {
    id: 1,
    entity: 'J. Silva (CPF: ***.456.***-01)',
    court: 'TJSP - Tribunal de Justiça de São Paulo',
    process: '1000234-56.2023.8.26.0100',
    date: '27/03/2024 - 14:30',
    type: 'Alerta',
    original: 'Expedida Carta de Citação para o endereço do réu.',
    status: 'Citação Expedida',
    ai: {
      summary: 'Houve a emissão de uma carta oficial para avisar você sobre o início deste processo.',
      translation: 'Citação é o ato pelo qual se chama o réu (você) ao processo para se defender.',
      impact: 'Você receberá uma correspondência em breve. É fundamental procurar um advogado para preparar sua defesa dentro do prazo legal.'
    }
  },
  {
    id: 2,
    entity: 'Empresa ABC (CNPJ: 12.345.678/0001-90)',
    court: 'TRT-2 - São Paulo',
    process: '0001234-56.2023.5.02.0001',
    date: '26/03/2024 - 09:15',
    type: 'Movimentação',
    original: 'Designada Audiência de Conciliação para o dia 15/05/2024 às 14:00.',
    status: 'Audiência Agendada',
    ai: {
      summary: 'Uma reunião entre as partes foi agendada para tentar um acordo.',
      translation: 'Audiência de Conciliação é um encontro para buscar resolver o conflito sem julgamento final.',
      impact: 'Marque na sua agenda: 15/05 às 14:00. Sua presença (ou de seu representante) é obrigatória.'
    }
  },
  {
    id: 3,
    entity: 'J. Silva (CPF: ***.456.***-01)',
    court: 'TJSP',
    process: '1000234-56.2023.8.26.0100',
    date: '25/03/2024 - 11:20',
    type: 'Positivo',
    original: 'Julgado improcedente o pedido do autor. Arquivamento definitivo.',
    status: 'Processo Encerrado',
    ai: {
      summary: 'O processo foi finalizado em seu favor e será guardado.',
      translation: 'Julgado improcedente significa que o juiz não aceitou o pedido da outra parte.',
      impact: 'O caso está formalmente encerrado. Você não precisa tomar nenhuma nova ação.'
    }
  }
];

const Feed = () => {
  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 0.5rem', letterSpacing: '-0.025em' }}>
          Timeline Juez
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Acompanhando seus documentos em tempo real.</p>
      </header>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          {/* Timeline Link (Concept) */}
          <div style={{
            position: 'absolute',
            left: '20px',
            top: '40px',
            bottom: '20px',
            width: '2px',
            background: 'var(--border-color)',
            zIndex: 0
          }} />

          {mockMovements.map((m) => (
            <Card key={m.id} data={m} />
          ))}
      </div>
    </div>
  );
};

export default Feed;
