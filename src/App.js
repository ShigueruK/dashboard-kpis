import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MetricCard from './components/MetricCard';
import VentasChart from './components/VentasChart';
import ProductosChart from './components/ProductosChart';

function App() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cumplimiento, setCumplimiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ventasRes, productosRes, cumplimientoRes] = await Promise.all([
          axios.get('http://localhost:8000/ventas-mensuales'),
          axios.get('http://localhost:8000/top-productos'),
          axios.get('http://localhost:8000/cumplimiento')
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

  const totalVentas = ventas.reduce((sum, item) => sum + item.ventas, 0);
  const ultimoMes = ventas[ventas.length - 1];
  const cumplimientoUltimoMes = ultimoMes ? ((ultimoMes.ventas / ultimoMes.objetivo) * 100).toFixed(1) : 0;
  const mejorMes = ventas.reduce((max, m) => m.ventas > max.ventas ? m : max, ventas[0]);

  return (
    <div className="App">
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Dashboard de KPIs de Ventas</h1>
        <p>Datos obtenidos desde PostgreSQL vía FastAPI</p>
      </header>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <MetricCard title="Ventas totales" value={`S/ ${totalVentas.toLocaleString()}`} color="#8884d8" />
        <MetricCard title="Cumplimiento último mes" value={cumplimientoUltimoMes} unit="%" color="#82ca9d" />
        <MetricCard title="Mejor mes (ventas)" value={mejorMes?.mes || '-'} color="#ffc658" />
        {cumplimiento && (
          <MetricCard title="Promedio cumplimiento" value={cumplimiento.promedio} unit="%" color="#ff8042" />
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <VentasChart data={ventas} />
      </div>

      <div>
        <ProductosChart data={productos} />
      </div>
    </div>
  );
}

export default App;
