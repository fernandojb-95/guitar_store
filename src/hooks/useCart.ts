import { useState, useEffect, useMemo } from "react";
import { db } from "../utils/db";
import { CartItem, Guitar, GuitarId } from "../types";

const useCart = () => {
    const initialState = () : CartItem[] => {
        const infoCart = localStorage.getItem('cart');
        return infoCart ? JSON.parse(infoCart) : [];
      }
      const [products, setProducts] = useState<Guitar[]>([]);
      const [cart, setCart] = useState(initialState);
    
      useEffect(() => {
        setProducts(db);
      }, []);
    
      useEffect(() => {
        saveLocalStorage();
      }, [cart]);
    
      const MAX_ITEMS = 5;
      const MIN_ITEMS = 1;
    
      const addToCart = (i: Guitar) => {
        const item : CartItem = {...i, quantity: 0}; 
        const repeated = cart.findIndex((g) => g.id === item.id);
        if (repeated < 0) {
          item.quantity = 1;
          setCart([...cart, item]);
        } else {
          const newCart = [...cart];
          if (newCart[repeated].quantity < MAX_ITEMS) {
            newCart[repeated].quantity++;
            setCart(newCart);
          }
        }
        saveLocalStorage();
      };
    
      const deleteCart = () => {
        setCart([]);
      };
      const increaseQuantity = (id: GuitarId) => {
        const newCart = cart.map((prod) => {
          if (prod.id === id && prod.quantity < MAX_ITEMS) {
            return {
              ...prod,
              quantity: prod.quantity + 1,
            };
          }
          return prod;
        });
        setCart([...newCart]);
      };
    
      const decreaseQuantity = (id: GuitarId) => {
        const newCart = cart.map((prod) => {
          if (prod.id === id && prod.quantity > MIN_ITEMS) {
            return {
              ...prod,
              quantity: prod.quantity - 1,
            };
          }
          return prod;
        });
        setCart([...newCart]);
      };
    
      const removeFromCart = (id: GuitarId) => {
        const newCartProducts = cart.filter((g) => g.id !== id);
        setCart([...newCartProducts]);
      };
    
      const saveLocalStorage = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
      };

      const isEmpty = useMemo(() => cart.length === 0, [cart]);
      const totalPrice = useMemo(() => cart.reduce((total, item) => total + (item?.price * item?.quantity), 0), [cart])

      return {
        cart,
        addToCart,
        deleteCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        products,
        isEmpty,
        totalPrice
      };
}

export default useCart;