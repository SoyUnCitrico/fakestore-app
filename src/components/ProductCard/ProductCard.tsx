import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { Product } from '../../types';
import { useCart } from '../../context/useCart'
import { FaCartPlus } from "react-icons/fa";
import { translatedCat } from '../../types';
interface ProductCardProps {
  product: Product;
}

const truncateTitle = (title: string, maxLength: number = 40): string => {
   if (title.length <= maxLength) return title;
   return title.substring(0, maxLength) + '...';
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    // Opcional: Mostrar alguna notificación
    // console.log(`${product.title} added to cart!`);
  };
  return (
    <Link to={`/product/${product.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.cardImage}
        />
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle} title={product.title}>
            {truncateTitle(product.title)}
          </h3>
          <div className={styles.cardFooter}> 
            <p className={styles.cardPrice}>${product.price.toFixed(2)}</p>
            {/* Botón Añadir al Carrito */}
            <button
              className={styles.addToCartBtn}
              onClick={handleAddToCartClick}
              title="Agregar al carrito"
            >
              <FaCartPlus />
            </button>
          </div>
            <p className={styles.cardCategory}>
              {translatedCat[product.category.toLowerCase()]}
            </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;