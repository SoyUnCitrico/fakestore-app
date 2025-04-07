import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

// Componente para error 404
const NotFound: React.FC = () => (
    <div className={styles.notfoundContainer}>
      <h2>404 - Página No Encontrada</h2>
      <br/>
      <p>Lo sentimos, la página que estas buscando no existe.</p>
      <Link to="/"><p className={styles.link}>Regresa al Inicio</p></Link>
    </div>
  );

export default NotFound;