import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import LoadingSpinner from '../Loader/Spinner';
import PaginationControls from '../Pagination/Pagination';
import { fetchProducts } from '../../services/api';
import { Product } from '../../types';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  selectedCategory: string;
  itemsPerPage?: number;
  myRef?: any
}

const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  myRef,
  itemsPerPage = 8,
}) => {
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar productos cuando cambia la categoría
  useEffect(() => {
    const loadProductsForCategory = async () => {
      setLoading(true);
      setError(null);
      setCurrentPage(1); // Resetear a 1 
      setAllProducts([]); 
      try {
        const fetchedProducts = await fetchProducts(selectedCategory);
        setAllProducts(fetchedProducts);
      } catch (err) {
        console.error(`Fallo al cargar los productos de la categoría '${selectedCategory}':`, err);
        setError('No pudimos cargar tus productos. Intenta recargando la página por favor.');
      } finally {
        setLoading(false);
      }
    };

    loadProductsForCategory();
  }, [selectedCategory]); 

  // Calcula el número total de páginas
  const totalPages = useMemo(() => {
      return Math.ceil(allProducts.length / itemsPerPage)
  }, [allProducts, itemsPerPage]);

  // Calcula los productos a mostrar en la página actual 
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allProducts.slice(startIndex, endIndex);
  }, [allProducts, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      //@ts-ignore
      myRef.current.scrollIntoView({ behavior: 'smooth' });  
    }
  };

  // Manejo de carga y errores

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className={styles.errorMessage}>Error: {error}</p>;
  }

  if (allProducts.length === 0) {
    return <p className={styles.noProductsMessage}>No se encontraron productos en esta categoría.</p>;
  }

  return (
    <div>
      <div className={styles.productGrid}>
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductGrid;