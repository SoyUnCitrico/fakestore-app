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
        id: React.Key | number | null | undefined; 
        image: string | undefined; 
        title: string ; 
        price: number; 
      }; 
      quantity: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined;
  }

  // DIccionario de categorias para manejo de traduccion
  export const translatedCat : Record<string, string> = {
    "all": "Todos",
    "electronics": "Electrónica",
    "jewelery": "Joyería",
    "men's clothing": "Ropa de Hombre",
    "women's clothing": "Ropa de Mujer",
  }