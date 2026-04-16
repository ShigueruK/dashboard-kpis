import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VentasPorCategoriaChart = ({ data }) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
      <h3>Ventas por categoría (Marzo 2025)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="categoria" />
          <YAxis />
          <Tooltip formatter={(value) => `S/ ${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="ventas" fill="#82ca9d" name="Ventas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VentasPorCategoriaChart;