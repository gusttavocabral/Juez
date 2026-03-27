import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'feed', label: 'Feed', icon: 'Timeline' },
    { id: 'monitoring', label: 'Monitoramento', icon: 'List' },
    { id: 'settings', label: 'Configurações', icon: 'Settings' },
  ];

  return (
    <aside className="glass" style={{
      width: '260px',
      height: '100vh',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      position: 'sticky',
      top: 0
    }}>
      <div style={{ padding: '0 1rem' }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          color: 'var(--primary)',
          margin: 0,
          letterSpacing: '-0.025em'
        }}>
          Feed Jurídico
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Inteligente</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === item.id ? 'var(--primary)' : 'transparent',
              color: activeTab === item.id ? 'white' : 'var(--text-main)',
              cursor: 'pointer',
              fontWeight: activeTab === item.id ? '600' : '400',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              width: '100%'
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', padding: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <p>© 2024 Judge App</p>
        <p style={{ marginTop: '0.5rem' }}>Aviso: Não substitui orientação jurídica profissional.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
