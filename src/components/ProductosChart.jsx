import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProductosChart = ({ data }) => {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>Top 5 productos más vendidos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={data} margin={{ left: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="nombre" />
          <Tooltip formatter={(value) => `S/ ${value.toLocaleString()}`} />
          <Bar dataKey="ventas" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductosChart;
