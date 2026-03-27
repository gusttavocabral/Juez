import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Monitoring from './components/Monitoring';
import Settings from './components/Settings';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="app-container" style={{ display: 'flex', width: '100%' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'feed' && <Feed />}
        {activeTab === 'monitoring' && <Monitoring />}
        {activeTab === 'settings' && <Settings />}
      </main>
    </div>
  );
}

export default App;
