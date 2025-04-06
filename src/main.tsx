import React from 'react'
import ReactDOM from 'react-dom/client'
import { CartProvider } from './context/CartContex.tsx'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render( 
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
)