import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import NotFound from './components/NotFoud/NotFoud';
import ProductDetailPage from './pages/ProductDetails/ProductDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';



const App: React.FC = () => {
  return (
    <Router>      
      <Header></Header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/product/*" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>    
      <Footer></Footer>  
    </Router>
  );
}

export default App;