import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import MetricCard from './MetricCard';
import VentasChart from './VentasChart';
import ProductosChart from './ProductosChart';
import VentasPorCategoriaChart from './VentasPorCategoriaChart';
import '../App.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cumplimiento, setCumplimiento] = useState(null);
  const [ventasCategoria, setVentasCategoria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No hay token de autenticación');
        setLoading(false);
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      try {
        // 1. Cargar datos comunes (ventas, productos, cumplimiento)
        const [ventasRes, productosRes, cumplimientoRes] = await Promise.all([
          axios.get('http://localhost:8000/ventas-mensuales', { headers }),
          axios.get('http://localhost:8000/top-productos', { headers }),
          axios.get('http://localhost:8000/cumplimiento', { headers })
        ]);

        setVentas(ventasRes.data);
        setProductos(productosRes.data);
        setCumplimiento(cumplimientoRes.data);

        // 2. Si el rol es admin o gerente, cargar datos adicionales
        if (user?.rol === 'admin' || user?.rol === 'gerente') {
          try {
            const catRes = await axios.get('http://localhost:8000/ventas-por-categoria', { headers });
            setVentasCategoria(catRes.data);
          } catch (err) {
            console.error('Error al cargar ventas por categoría:', err);
            // No mostramos error general, solo log
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.rol]); // Dependencia: si cambia el rol, recargamos (por si cambia de usuario)

  if (loading) return <div className="App">Cargando datos...</div>;
  if (error) return <div className="App">Error: {error}</div>;

  const totalVentas = ventas.reduce((sum, item) => sum + item.ventas, 0);
  const ultimoMes = ventas[ventas.length - 1];
  const cumplimientoUltimoMes = ultimoMes ? ((ultimoMes.ventas / ultimoMes.objetivo) * 100).toFixed(1) : 0;
  const mejorMes = ventas.reduce((max, m) => m.ventas > max.ventas ? m : max, ventas[0]);

  return (
    <div className="App">
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Dashboard de KPIs de Ventas</h1>
        <p>Bienvenido, <strong>{user?.nombre || user?.email}</strong> (Rol: {user?.rol})</p>
        <button onClick={logout}>Cerrar sesión</button>
      </header>

      {/* KPIs comunes */}
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
          <VentasPorCategoriaChart data={ventasCategoria} />
        </div>
      )}

      {user?.rol === 'gerente' && (
        <div style={{ marginBottom: '30px', backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px' }}>
          <h3>Panel de Gerente</h3>
          <VentasPorCategoriaChart data={ventasCategoria} />
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