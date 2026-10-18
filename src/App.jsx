import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ backgroundColor: '#020617', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#facc15', marginBottom: '1rem' }}>
        Kalos Locke Hub Funciona!
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
        La página ya está conectada correctamente con Vercel.
      </p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ backgroundColor: '#facc15', color: '#020617', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Contador: {count}
      </button>
    </div>
  );
}
