import React from 'react';
import './App.css';
import MetricCard from './components/MetricCard';
import VentasChart from './components/VentasChart';
import ProductosChart from './components/ProductosChart';
import { ventasMensuales, topProductos, cumplimiento } from './data/ventas';

function App() {
  const totalVentas = ventasMensuales.reduce((sum, item) => sum + item.ventas, 0);
  const ventasUltimoMes = ventasMensuales[ventasMensuales.length - 1].ventas;
  const objetivoUltimoMes = ventasMensuales[ventasMensuales.length - 1].objetivo;
  const cumplimientoUltimoMes = (ventasUltimoMes / objetivoUltimoMes * 100).toFixed(1);

  return (
    <div className="App">
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Dashboard de KPIs de Ventas</h1>
        <p>Datos simulados basados en experiencia retail</p>
      </header>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <MetricCard title="Ventas totales" value={`S/ ${totalVentas.toLocaleString()}`} color="#8884d8" />
        <MetricCard title="Cumplimiento último mes" value={cumplimientoUltimoMes} unit="%" color="#82ca9d" />
        <MetricCard title="Mejor mes (ventas)" value={ventasMensuales.reduce((max, m) => m.ventas > max.ventas ? m : max).mes} color="#ffc658" />
        <MetricCard title="Promedio cumplimiento" value={cumplimiento.promedio} unit="%" color="#ff8042" />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <VentasChart data={ventasMensuales} />
      </div>

      <div>
        <ProductosChart data={topProductos} />
      </div>
    </div>
  );
}

export default App;
