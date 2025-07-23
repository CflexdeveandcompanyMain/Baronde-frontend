import { useEffect, useState } from "react";
import { useGlobalState } from "../store/globalstate";
import type { HeroDataType } from "../mainpage/Hero/data";
import { QueryClient } from "@tanstack/react-query";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import {
  addToCartFn,
  getCart,
  IncrementCartFn,
  DecrementCartFn,
  DeleteCartFn,
} from "./getFetch";

export interface CartItem extends HeroDataType {
  productId: string;
  quantity: number;
  addedAt?: number;
}

export interface LocalCartItem {
  productId: string;
  quantity: number;
  addedAt: number;
}

// Helper function to check if user is verified
const isUserVerified = (): boolean => {
  try {
    const user = JSON.parse(sessionStorage.getItem("baron:user") || "{}");
    return user.isVerified === true;
  } catch (error) {
    console.error("Error reading user verification status:", error);
    return false;
  }
};

export const CartUtils = {
  getCart: (): LocalCartItem[] => {
    try {
      const cart = localStorage.getItem("baron:cart");
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return [];
    }
  },

  saveCart: (cart: LocalCartItem[]): void => {
    try {
      localStorage.setItem("baron:cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  },

  addToCart: (
    product: HeroDataType,
    syncItem: UseMutationResult<
      any,
      Error,
      {
        productId: string;
        quantity: number;
      },
      unknown
    >,
    queryClient: QueryClient
  ): LocalCartItem[] => {
    const cart = CartUtils.getCart();
    const existingItemIndex = cart.findIndex(
      (item) => item.productId === product._id
    );
    const currentQuantity =
      existingItemIndex > -1 ? cart[existingItemIndex].quantity : 0;
    if (currentQuantity >= product.stockQuantity) {
      console.warn("Cannot add more items - stock limit reached");
      return cart;
    }

    console.log("Adding....", isUserVerified());

    if (isUserVerified()) {
      console.log("User is verified");
      syncItem.mutate(
        { productId: product._id, quantity: 1 },
        {
          onSuccess(data) {
            console.log("Add to cart success:", data);
            queryClient.invalidateQueries({ queryKey: ["getCart"] });
          },
          onError(error) {
            console.error("Add to cart error:", error);
          },
        }
      );
      return cart;
    } else {
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
        cart[existingItemIndex].addedAt = Date.now();
      } else {
        cart.push({
          productId: product._id,
          quantity: 1,
          addedAt: Date.now(),
        });
      }

      CartUtils.saveCart(cart);
      return cart;
    }
  },

  incrementQuantity: (
    productId: string,
    incrementMutation: UseMutationResult<
      any,
      Error,
      { productId: string; quantity: number },
      unknown
    >,
    queryClient: QueryClient
  ): LocalCartItem[] => {
    const cart = CartUtils.getCart();
    const itemIndex = cart.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
      console.warn("Item not found in cart");
      return cart;
    }

    if (isUserVerified()) {
      incrementMutation.mutate(
        { productId, quantity: 1 },
        {
          onSuccess(data) {
            console.log("Increment success:", data);
            queryClient.invalidateQueries({ queryKey: ["getCart"] });
          },
          onError(error) {
            console.error("Increment error:", error);
          },
        }
      );
      return cart;
    } else {
      cart[itemIndex].quantity += 1;
      cart[itemIndex].addedAt = Date.now();

      CartUtils.saveCart(cart);
      return cart;
    }
  },

  decrementQuantity: (
    productId: string,
    decrementMutation: UseMutationResult<
      any,
      Error,
      { productId: string; quantity: number },
      unknown
    >,
    deleteMutation: UseMutationResult<any, Error, string, unknown>,
    queryClient: QueryClient
  ): LocalCartItem[] => {
    const cart = CartUtils.getCart();
    const itemIndex = cart.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
      console.warn("Item not found in cart");
      return cart;
    }

    if (isUserVerified()) {
      decrementMutation.mutate(
        { productId, quantity: -1 },
        {
          onSuccess(data) {
            console.log("Decrement success:", data);
            queryClient.invalidateQueries({ queryKey: ["getCart"] });
          },
          onError(error) {
            console.error("Decrement error:", error);
          },
        }
      );
      return cart;
    } else {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1;
        cart[itemIndex].addedAt = Date.now();
      } else {
        if (cart[itemIndex].quantity == 1)
          CartUtils.removeAllInstances(
            cart[itemIndex].productId,
            deleteMutation,
            queryClient
          );
        cart.splice(itemIndex, 1);
      }

      CartUtils.saveCart(cart);
      return cart;
    }
  },

  removeAllInstances: (
    productId: string,
    deleteMutation: UseMutationResult<any, Error, string, unknown>,
    queryClient: QueryClient
  ): LocalCartItem[] => {
    const cart = CartUtils.getCart();

    if (isUserVerified()) {
      deleteMutation.mutate(productId, {
        onSuccess(data) {
          console.log("Delete success:", data);
          queryClient.invalidateQueries({ queryKey: ["getCart"] });
        },
        onError(error) {
          console.error("Delete error:", error);
        },
      });
      return cart;
    } else {
      const updatedCart = cart.filter((item) => item.productId !== productId);
      CartUtils.saveCart(updatedCart);
      return updatedCart;
    }
  },

  getProductQuantity: (productId: string): number => {
    const cart = CartUtils.getCart();
    const item = cart.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  },

  getTotalItemCount: (): number => {
    const cart = CartUtils.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  computeCartTotals: (products: HeroDataType[]) => {
    const cart = CartUtils.getCart();

    let subtotal = 0;
    let totalItems = 0;

    cart.forEach((cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId);
      if (product) {
        const itemPrice = product.price - (product.discount || 0);
        subtotal += itemPrice * cartItem.quantity;
        totalItems += cartItem.quantity;
      }
    });

    const tax = subtotal > 1000 ? 700 : 0;
    const total = subtotal + tax;
    const discount = subtotal > 500000 ? 3000 : 0;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(total.toFixed(2)),
      discount,
      itemCount: totalItems,
    };
  },

  canIncrement: (productId: string, products: HeroDataType[]): boolean => {
    const cart = CartUtils.getCart();
    const cartItem = cart.find((item) => item.productId === productId);
    const product = products.find((p) => p._id === productId);

    if (!cartItem || !product) return false;

    return cartItem.quantity < product.stockQuantity;
  },

  isInCart: (productId: string): boolean => {
    const cart = CartUtils.getCart();
    return cart.some((item) => item.productId === productId);
  },

  mergeCartWithProducts: (
    cartItems: LocalCartItem[],
    products: HeroDataType[]
  ): CartItem[] => {
    return cartItems
      .map((cartItem) => {
        const product = products.find((p) => p._id === cartItem.productId);
        if (!product) return null;

        return {
          ...product,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          addedAt: cartItem.addedAt,
          price: product.price - (product.discount || 0), // Apply discount
        };
      })
      .filter(Boolean) as CartItem[];
  },
};

export const useCart = () => {
  const [cart, setCart] = useState<LocalCartItem[]>(CartUtils.getCart());
  const [products, setProducts] = useState<HeroDataType[]>([]);
  const { setCartlen } = useGlobalState();
  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => addToCartFn(productId, quantity),
    mutationKey: ["addtocart"],
  });

  const incrementMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => IncrementCartFn(productId, quantity),
    mutationKey: ["incrementcart"],
  });

  const decrementMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => DecrementCartFn(productId, quantity),
    mutationKey: ["decrementcart"],
  });

  const deleteMutation = useMutation({
    mutationFn: (productId: string) => DeleteCartFn(productId),
    mutationKey: ["deletecart"],
  });

  const { data: data, status } = useQuery({
    queryFn: () => getCart(),
    queryKey: ["getCart"],
    enabled: isUserVerified(),
  });

  useEffect(() => {
    if (isUserVerified() && data && status === "success") {
      const backendCart: LocalCartItem[] =
        data.data?.items?.map((item: any) => ({
          productId: item.product._id || item.product,
          quantity: item.quantity,
          addedAt: Date.now(),
        })) || [];
      console.log(backendCart);

      setCart(backendCart);
      CartUtils.saveCart(backendCart);

      const totalItems = backendCart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartlen(totalItems);
    } else if (!isUserVerified()) {
      const localCart = CartUtils.getCart();
      setCart(localCart);
      const totalItems = localCart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartlen(totalItems);
    }
  }, [data, status, setCartlen]);

  const addToCart = (product: HeroDataType) => {
    const updatedCart = CartUtils.addToCart(
      product,
      addToCartMutation,
      queryClient
    );
    setCart(updatedCart);
    const totalItems = updatedCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartlen(totalItems);
  };

  const incrementQuantity = (productId: string) => {
    const updatedCart = CartUtils.incrementQuantity(
      productId,
      incrementMutation,
      queryClient
    );
    setCart(updatedCart);
    const totalItems = updatedCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartlen(totalItems);
  };

  const decrementQuantity = (productId: string) => {
    const updatedCart = CartUtils.decrementQuantity(
      productId,
      decrementMutation,
      deleteMutation,
      queryClient
    );
    setCart(updatedCart);
    const totalItems = updatedCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartlen(totalItems);
  };

  const removeAllInstances = (productId: string) => {
    const updatedCart = CartUtils.removeAllInstances(
      productId,
      deleteMutation,
      queryClient
    );
    setCart(updatedCart);
    const totalItems = updatedCart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartlen(totalItems);
    return updatedCart;
  };

  const getCartWithProducts = () => {
    return CartUtils.mergeCartWithProducts(cart, products);
  };

  const totals = CartUtils.computeCartTotals(products);

  return {
    cart,
    cartWithProducts: getCartWithProducts(),
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeAllInstances,
    totals,
    canIncrement: (productId: string) =>
      CartUtils.canIncrement(productId, products),
    getProductQuantity: CartUtils.getProductQuantity,
    isInCart: CartUtils.isInCart,
    getTotalItemCount: CartUtils.getTotalItemCount,
    setProducts,
    isAddingToCart: addToCartMutation.isPending,
    isIncrementing: incrementMutation.isPending,
    isDecrementing: decrementMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUserVerified: isUserVerified(),
  };
};
