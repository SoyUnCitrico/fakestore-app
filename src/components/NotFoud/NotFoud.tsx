import React from 'react';
import { Link } from 'react-router-dom'


// Componente para error 404
const NotFound: React.FC = () => (
    <div style={{ textAlign: 'center', padding: '2rem', height: '77vh' }}>
      <h2>404 - Página No Encontrada</h2>
      <br/>
      <p>Lo sentimos, la página que estas buscando no existe.</p>
      <Link to="/">Regresa al Inicio</Link>
    </div>
  );

export default NotFound;