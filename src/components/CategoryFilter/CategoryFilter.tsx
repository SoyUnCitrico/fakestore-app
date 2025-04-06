import React from 'react';
import { translatedCat } from '../../types';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void; 
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  if (!categories || categories.length === 0) {
    return null;
  }
  
  // console.log(categories)
  return (
    <div className={styles.filterContainer}>
      <p>Categorías:</p>
      <div className={styles.buttonGroup}>
        {categories.map((category: string) => ( // TS puede inferir 'category' como string aquí
          <button
            key={category}
            className={`${styles.filterButton} ${
              selectedCategory === category ? styles.active : ''
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {translatedCat[category.toLowerCase()]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;