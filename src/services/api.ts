import { Product } from '../types'; 

const BASE_URL = 'https://fakestoreapi.com';


export const fetchProducts = async (category: string = ''): Promise<Product[]> => {
  try {
    const url = category && category !== 'all'
      ? `${BASE_URL}/products/category/${category}`
      : `${BASE_URL}/products`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`¡Error HTTP! estado: ${response.status}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al buscar los productos:", error);
    throw error;
  }
};

// Devuelve una promesa que resuelve a un Producto o null si no se encuentra
export const fetchProductById = async (id: string | number): Promise<Product | null> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null; // Producto no encontrado
      throw new Error(`¡Error HTTP! estado: ${response.status}`);
    }
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(`Error al obtener el producto con el id ${id}:`, error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error(`¡Error HTTP! estado: ${response.status}`);
    }
    const data: string[] = await response.json();
    return ['all', ...data];
  } catch (error) {
    console.error("Error al buscar las categorias:", error);
    throw error;
  }
};