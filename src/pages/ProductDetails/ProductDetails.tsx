import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../../services/api';
import LoadingSpinner from '../../components/Loader/Spinner';
import { Product } from '../../types';
import { useCart } from '../../context/CartContex'; 
import styles from './ProductDetails.module.css';
import { translatedCat } from '../../types';
import { FaArrowLeft } from 'react-icons/fa';
import NotFound from '../../components/NotFoud/NotFoud';

interface RouteParams {
  productId: string; 
  [key: string]: string | undefined; 
}

const ProductDetails: React.FC = () => {
  const { productId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
     const loadProduct = async () => {
         if (!productId) {
             setError('Falta el ID del producto.'); setLoading(false); return;
         }
         setLoading(true); setError(null);
         try {
            const fetchedProduct = await fetchProductById(productId);
            if (!fetchedProduct) { setError(`Producto con el ID ${productId} no encontrado.`); }
            setProduct(fetchedProduct);
         } catch (err) {
            console.error(`Fallo al cargar el producto ${productId}:`, err);
            setError('No pudimos cargar los detalles del producto. Intenta recargando la página más tarde.');
         } finally { setLoading(false); }
     };
     loadProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) { 
      addToCart(product);
      alert(`¡${product.title} agregado al carrito!`);
    }
  };
  console.log(error ?? "hola")
  if (loading) return <LoadingSpinner />;
  if (error) return ( <div className={styles.errorContainer}><NotFound></NotFound></div> );
  if (!product) return ( <div className={styles.errorContainer}><NotFound></NotFound></div> );

  // console.log(product)
  return (<>
    <nav className={styles.navButtonContainer}>
      <button onClick={() => navigate(-1)} className={styles.backButtonNav}>
        
        <FaArrowLeft/>
        {'Volver'}
      </button>
    </nav>
    <div className={styles.detailPage}>
       
      <div className={styles.productDetail}>
        <div className={styles.imageContainer}>
          <img src={product.image} alt={product.title} className={styles.productImage} />
        </div>
        <div className={styles.infoContainer}>
         
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.productCategory}> {translatedCat[product.category.toLowerCase()]}</p>
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
          <div className={styles.rating}>
            <span>Calificación: {product.rating?.rate ?? 'N/A'}</span>
            <span className={styles.ratingCount}> ({product.rating?.count ?? 0} reseñas)</span>
          </div>
          <h4 className={styles.description}>Descripción:</h4>
          <p className={styles.productDescription}>{product.description}</p>
          <button
             onClick={handleAddToCart}
             className={styles.addToCartButton}
          >
             Agregar al carrito
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetails;