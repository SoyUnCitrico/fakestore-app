import React, { useState, useEffect, useRef } from 'react';
import Hero from '../../components/Hero/Hero';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import ProductGrid from '../../components/ProductGrid/ProductGrid'; 
import LoadingSpinner from '../../components/Loader/Spinner'; 
import { fetchCategories } from '../../services/api';
import styles from './HomePage.module.css'; 

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);
  const topRef = useRef(null);

  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Fallo al buscar las categorias:", err);
        setErrorCategories('No se pudieron cargar las categorias. Intenta recargando la página más tarde.');
        setCategories(['all']); 
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, []); 

  const handleSelectCategory = (category: string): void => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles.homePage}>
      <Hero myRef={topRef}></Hero>
      <h2 ref={topRef}>Nuestros Productos</h2>
      {/* <h2>Nuestros Productos</h2> */}

      {/* Mostrar filtro solo si las categorías cargaron */}
      {loadingCategories && <LoadingSpinner/>} 
      {errorCategories && <p className={styles.categoryError}>Error: {errorCategories}</p>}
      {!loadingCategories && !errorCategories && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
      )}

      {!errorCategories && (
         <ProductGrid
           key={selectedCategory} 
           selectedCategory={selectedCategory}
           itemsPerPage={9}
           myRef={topRef}
         />
      )}
    </div>
  );
};

export default HomePage;