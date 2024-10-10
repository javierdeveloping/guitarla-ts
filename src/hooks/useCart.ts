import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import { CartItem, Guitar, GuitarID } from "../types/index";

function useCart() {
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [data, setData] = useState<Guitar[]>([]);

  function initialCart(): CartItem[] {
    const localStorageContent = localStorage.getItem("cart");
    const localStorageCart = localStorageContent
      ? JSON.parse(localStorageContent)
      : [];
    return localStorageCart;
  }

  useEffect(() => {
    console.log("setting data");
    //load data when component is ready, as if we were retrieving data from an API
    setData(db);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item: Guitar) {
    const itemExist = cart.findIndex((guitar) => guitar.id == item.id);

    if (itemExist < 0) {
      const carItem = { ...item, quantity: 1 };
      setCart((prevCart) => [...prevCart, carItem]);
    } else {
      // const updatedCart = [...cart];
      // updatedCart[itemExist].quantity += 1;
      // setCart(updatedCart);
      modifyQuantity(item.id, 1);
    }
  }

  function removeFromCart(id: GuitarID) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  function modifyQuantity(id: GuitarID, amount: number) {
    const updatedCart = cart
      .map((item) => {
        if (
          item.id === id &&
          ((amount > 0 && item.quantity < MAX_ITEMS) ||
            (amount < 0 && item.quantity > MIN_ITEMS))
        ) {
          item.quantity += amount;
        }
        return item;
      })
      .filter((element) => element.quantity > 0);

    setCart(updatedCart);
  }

  const isEmpty = useMemo(() => {
    return cart === null || cart.length === 0;
  }, [cart]);
  const cartTotal = useMemo(
    () =>
      cart === null
        ? 0
        : cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart]
  );

  return {
    cart,
    removeFromCart,
    modifyQuantity,
    clearCart,
    addToCart,
    data,
    isEmpty,
    cartTotal,
  };
}

export { useCart };
