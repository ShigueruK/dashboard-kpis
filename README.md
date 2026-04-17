# 📈 Dashboard de KPIs de Ventas

Aplicación web interactiva que muestra indicadores clave de ventas mediante gráficos y tarjetas. Los datos se obtienen desde una API propia (FastAPI + PostgreSQL). Incluye autenticación, roles y panel de administrador.

## 🧰 Tecnologías

- **React** – Biblioteca para interfaces de usuario
- **Axios** – Cliente HTTP
- **Recharts** – Librería de gráficos
- **React Router DOM** – Enrutamiento
- **JWT decode** – Decodificación de tokens
- **CSS3** – Estilos personalizados

## 🖥️ Instalación local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ShigueruK/dashboard-kpis.git
   cd dashboard-kpis
2. Instala dependencias:
    ```bash
   npm install
    
3. Crea un archivo .env en la raíz:
    ```bash
   REACT_APP_API_URL=http://localhost:8000

4. Inicia el servidor de desarrollo:
    ```bash
    npm start

5. Abre http://localhost:3000

🔐 Credenciales de prueba (local)
Admin: admin@example.com / admin123
Gerente: gerente@example.com / gerente123
Vendedor: vendedor@example.com / vendedor123

📸 Capturas de pantalla
https://docs/dashboard.png

📁 Estructura del proyecto
src/
├── components/
│   ├── Login.jsx
│   ├── Registro.jsx
│   ├── Dashboard.jsx
│   ├── MetricCard.jsx
│   ├── VentasChart.jsx
│   ├── ProductosChart.jsx
│   └── VentasPorCategoriaChart.jsx
├── context/
│   └── AuthContext.jsx
├── App.js
├── App.css
└── index.js

🚀 Funcionalidades

- Registro e inicio de sesión con JWT.
- Roles: admin, gerente, vendedor.
- Dashboard con KPIs: ventas mensuales, top productos, cumplimiento.
- Panel de administrador con gráfico de ventas por categoría (solo visible para admin/gerente).
- Protección de rutas.
- Persistencia de sesión con token en localStorage.

## 📄 Licencia

MIT
