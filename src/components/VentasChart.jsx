import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VentasChart = ({ data }) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>Ventas mensuales vs Objetivo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip formatter={(value) => `S/ ${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="ventas" fill="#8884d8" name="Ventas" />
          <Bar dataKey="objetivo" fill="#82ca9d" name="Objetivo" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VentasChart;