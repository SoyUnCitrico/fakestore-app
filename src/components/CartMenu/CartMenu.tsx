import React from 'react';
import { useCart } from '../../context/CartContex';
import styles from './CartMenu.module.css';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaTimes, FaTrash } from 'react-icons/fa';
import { ItemList } from '../../types';
const CartMenu: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    getCartItemCount,
    getCartTotal,
    isCartOpen,
    toggleCart
  } = useCart();

  const itemCount = getCartItemCount();
  const cartTotal = getCartTotal();

  return (
    <div className={styles.cartMenuContainer}>
      {/* Botón para abrir/cerrar el carrito */}
      <button onClick={toggleCart} className={styles.cartButton}>
        <FaShoppingCart />
        {itemCount > 0 && <span className={styles.itemCountBadge}>{itemCount}</span>}
      </button>

      {/* Menú desplegable del carrito */}
      {isCartOpen && (
        <div className={styles.cartDropdown}>
          <div className={styles.cartHeader}>
            <h3>Carrito de Compras</h3>
            <button onClick={toggleCart} className={styles.closeButton}>
              <FaTimes />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className={styles.emptyCartMessage}>Tu carrito esta vacío.</p>
          ) : (
            <>
              <ul className={styles.cartItemList}>
                {cartItems.map((item: ItemList) => (
                  <Link to={`/product/${item.product.id}`}>
                    <li key={item.product.id} className={styles.cartItem}>
                      <img src={item.product.image} alt={item.product.title} className={styles.itemImage} />
                      <div className={styles.itemDetails}>
                        <span className={styles.itemTitle} title={item.product.title}>
                          {item.product.title.substring(0, 30)}{item.product.title.length > 30 ? '...' : ''}
                        </span>
                        <span className={styles.itemPrice}>
                          {item.quantity} x ${item.product.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id ? item.product.id : Math.random())}
                        className={styles.removeItemButton}
                        title="Remover item"
                      >
                        <FaTrash />
                      </button>
                    </li>
                  </Link>
                ))}
              </ul>
              <div className={styles.cartFooter}>
                <p className={styles.cartTotal}>
                  Total: ${cartTotal.toFixed(2)}
                </p>
                <button className={styles.checkoutButton}>
                  Ir a pagar
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {/* Overlay para cerrar al hacer click fuera */}
      {isCartOpen && <div className={styles.overlay} onClick={toggleCart}></div>}
    </div>
  );
};

export default CartMenu;