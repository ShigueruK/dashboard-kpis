// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import MetricCard from './MetricCard';
import VentasChart from './VentasChart';
import ProductosChart from './ProductosChart';
import '../App.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cumplimiento, setCumplimiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [ventasRes, productosRes, cumplimientoRes] = await Promise.all([
          axios.get('http://localhost:8000/ventas-mensuales', { headers }),
          axios.get('http://localhost:8000/top-productos', { headers }),
          axios.get('http://localhost:8000/cumplimiento', { headers })
        ]);
        setVentas(ventasRes.data);
        setProductos(productosRes.data);
        setCumplimiento(cumplimientoRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="App">Cargando datos...</div>;
  if (error) return <div className="App">Error: {error}</div>;

  // Cálculos igual que antes
  const totalVentas = ventas.reduce((sum, item) => sum + item.ventas, 0);
  const ultimoMes = ventas[ventas.length - 1];
  const cumplimientoUltimoMes = ultimoMes ? ((ultimoMes.ventas / ultimoMes.objetivo) * 100).toFixed(1) : 0;
  const mejorMes = ventas.reduce((max, m) => m.ventas > max.ventas ? m : max, ventas[0]);

  return (
    <div className="App">
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Dashboard de KPIs de Ventas</h1>
        <p>Bienvenido, <strong>{user?.nombre}</strong> (Rol: {user?.rol})</p>
        <button onClick={logout}>Cerrar sesión</button>
      </header>

      {/* KPIs comunes para todos los roles */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <MetricCard title="Ventas totales" value={`S/ ${totalVentas.toLocaleString()}`} color="#8884d8" />
        <MetricCard title="Cumplimiento último mes" value={cumplimientoUltimoMes} unit="%" color="#82ca9d" />
        <MetricCard title="Mejor mes (ventas)" value={mejorMes?.mes || '-'} color="#ffc658" />
        {cumplimiento && (
          <MetricCard title="Promedio cumplimiento" value={cumplimiento.promedio} unit="%" color="#ff8042" />
        )}
      </div>

      {/* KPIs adicionales según rol */}
      {user?.rol === 'admin' && (
        <div style={{ marginBottom: '30px', backgroundColor: '#e0f7fa', padding: '15px', borderRadius: '8px' }}>
          <h3>Panel de Administrador</h3>
          <p>Aquí puedes mostrar KPIs exclusivos como ventas por categoría, márgenes, etc.</p>
          {/* Aquí agregarás el componente de VentasPorCategoriaChart más adelante */}
        </div>
      )}

      {user?.rol === 'gerente' && (
        <div style={{ marginBottom: '30px', backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px' }}>
          <h3>Panel de Gerente</h3>
          <p>KPIs de equipo, rendimiento por tienda, etc.</p>
        </div>
      )}

      {/* Gráficos comunes */}
      <div style={{ marginBottom: '30px' }}>
        <VentasChart data={ventas} />
      </div>

      <div>
        <ProductosChart data={productos} />
      </div>
    </div>
  );
};
export default Dashboard;