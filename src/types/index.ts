export interface Rating {
    rate: number;
    count: number;
  }
  
  export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
  }
  
  export interface CartItem {
    product: Product; 
    quantity: number;
  }

  export interface ItemList {
      product: { 
        id: number | null | undefined; 
        image: string | undefined; 
        title: string ; 
        price: number; 
      }; 
      quantity: string | number | null | undefined;
  }

  export interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    getCartItemCount: () => number;
    getCartTotal: () => number;
    isCartOpen: boolean;
    toggleCart: () => void; 
  }
  
  // DIccionario de categorias para manejo de traduccion
  export const translatedCat : Record<string, string> = {
    "all": "Todos",
    "electronics": "Electrónica",
    "jewelery": "Joyería",
    "men's clothing": "Ropa de Hombre",
    "women's clothing": "Ropa de Mujer",
  }