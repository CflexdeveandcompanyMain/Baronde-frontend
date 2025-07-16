import { useState } from "react";
import { useGlobalState } from "../store/globalstate";

export interface HeroDataType {
  id: number;
  category: string;
  image: string[];
  name: string;
  description: string;
  price: number;
  discount?: number;
  stockQuantity: number;
}

export interface CartItem extends HeroDataType {
  cartItemId: string;
  addedAt: number;
}

function removeDuplicatesByKey(array: HeroDataType[]) {
  const seen = new Map();
  return array.filter((item: HeroDataType) => {
    const keyValue = item.name;
    if (seen.has(keyValue)) {
      return false;
    }
    seen.set(keyValue, true);
    return true;
  });
}

export const CartUtils = {
  generateCartItemId: (): string => {
    return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  getCart: (): CartItem[] => {
    try {
      const cart = sessionStorage.getItem("baron:cart");
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error("Error reading cart from sessionStorage:", error);
      return [];
    }
  },

  saveCart: (cart: CartItem[]): void => {
    try {
      sessionStorage.setItem("baron:cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to sessionStorage:", error);
    }
  },

  addToCart: (product: HeroDataType): CartItem[] => {
    const cart = CartUtils.getCart();

    const existingCount = cart.filter((item) => item.id === product.id).length;

    if (existingCount < product.stockQuantity) {
      const cartItem: CartItem = {
        ...product,
        cartItemId: CartUtils.generateCartItemId(),
        addedAt: Date.now(),
      };

      cart.push(cartItem);
      CartUtils.saveCart(cart);
    }
    return cart;
  },

  incrementQuantity: (productId: number): CartItem[] => {
    const cart = CartUtils.getCart();

    const existingItem = cart.find((item) => item.id === productId);
    if (!existingItem) return cart;

    const currentCount = cart.filter((item) => item.id === productId).length;

    if (currentCount < existingItem.stockQuantity) {
      const newCartItem: CartItem = {
        ...existingItem,
        cartItemId: CartUtils.generateCartItemId(),
        addedAt: Date.now(),
      };

      cart.push(newCartItem);
      CartUtils.saveCart(cart);
    }

    return cart;
  },

  decrementQuantity: (productId: number): CartItem[] => {
    const cart = CartUtils.getCart();

    const itemsWithProductId = cart.filter((item) => item.id === productId);

    if (itemsWithProductId.length > 0) {
      const mostRecentItem = itemsWithProductId.sort(
        (a, b) => b.addedAt - a.addedAt
      )[0];
      const indexToRemove = cart.findIndex(
        (item) => item.cartItemId === mostRecentItem.cartItemId
      );

      if (indexToRemove > -1) {
        cart.splice(indexToRemove, 1);
        CartUtils.saveCart(cart);
      }
    }

    return cart;
  },

  removeAllInstances: (productId: number): CartItem[] => {
    const cart = CartUtils.getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    CartUtils.saveCart(updatedCart);
    return updatedCart;
  },

  getFinalPrice: (item: CartItem): number => {
    if (item.discount) {
      return item.price * (1 - item.discount / 100);
    }
    return item.price;
  },

  getProductQuantity: (productId: number): number => {
    const cart = CartUtils.getCart();
    return cart.filter((item) => item.id === productId).length;
  },

  computeCartTotals: () => {
    const cart = CartUtils.getCart();

    const subtotal = cart.reduce((total, item) => {
      return total + item.price;
    }, 0);

    const itemCount = cart.length;

    const tax = subtotal > 1000 ? 700 : 0;
    const total = subtotal + tax;
    const discount = subtotal > 500000 ? 3000 : 0;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
      discount,
      itemCount,
    };
  },

  canIncrement: (productId: number): boolean => {
    const cart = CartUtils.getCart();
    const currentQuantity = cart.filter((item) => item.id === productId).length;
    const existingItem = cart.find((item) => item.id === productId);

    return existingItem ? currentQuantity < existingItem.stockQuantity : false;
  },

  isInCart: (productId: number): boolean => {
    const cart = CartUtils.getCart();
    const itemIndex = cart.findIndex((item) => item.id === productId);
    return itemIndex >= 0;
  },
};

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(CartUtils.getCart());
  let { setCartlen } = useGlobalState();

  const addToCart = (product: HeroDataType) => {
    const updatedCart = CartUtils.addToCart(product);
    setCart(updatedCart);
    setCartlen(cart.length);
  };

  const incrementQuantity = (productId: number) => {
    const updatedCart = CartUtils.incrementQuantity(productId);
    setCart(updatedCart);
  };

  const decrementQuantity = (productId: number) => {
    const updatedCart = CartUtils.decrementQuantity(productId);
    setCart(updatedCart);
  };

  const removeAllInstances = (productId: number) => {
    const updatedCart = CartUtils.removeAllInstances(productId);
    setCart(updatedCart);
    setCartlen(cart.length);
    return removeDuplicatesByKey(updatedCart);
  };

  const totals = CartUtils.computeCartTotals();

  return {
    cart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeAllInstances,
    totals,
    canIncrement: CartUtils.canIncrement,
    getProductQuantity: CartUtils.getProductQuantity,
    isInCart: CartUtils.isInCart,
  };
};
