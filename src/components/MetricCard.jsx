import React from 'react';

const MetricCard = ({ title, value, unit, color }) => {
  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderTop: `4px solid ${color}`
    }}>
      <h3 style={{ margin: 0, color: '#666' }}>{title}</h3>
      <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>
        {value}{unit && <span style={{ fontSize: '1rem' }}>{unit}</span>}
      </p>
    </div>
  );
};

export default MetricCard;
