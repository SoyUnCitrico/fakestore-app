import { useContext } from "react";
import { CartContextType } from "../types";
import { CartContext } from "./CartContex";

const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error('useCart debe usarse con CartProvider');
    }
    return context;
};

export {
    useCart
}