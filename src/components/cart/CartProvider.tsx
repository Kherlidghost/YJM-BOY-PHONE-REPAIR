"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { trackMetaAddToCart } from "@/lib/meta-pixel";

export type CartProduct = {
  id: string;
  name: string;
  price: number | string;
  image_url?: string | null;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url?: string | null;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (product: CartProduct, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const cartStorageKey = "yjm-boy-cart";
const CartContext = createContext<CartContextValue | null>(null);

function normalizePrice(value: number | string) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}

function readStoredCart() {
  try {
    const value = window.localStorage.getItem(cartStorageKey);
    if (!value) {
      return [];
    }

    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is CartItem => {
      return (
        item &&
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.quantity === "number"
      );
    });
  } catch {
    return [];
  }
}

function storeCart(items: CartItem[]) {
  window.localStorage.setItem(cartStorageKey, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readStoredCart());
  }, []);

  const persistItems = useCallback((nextItems: CartItem[]) => {
    setItems(nextItems);
    storeCart(nextItems);
  }, []);

  const addItem = useCallback(
    (product: CartProduct, quantity = 1) => {
      const safeQuantity = Math.max(1, Math.floor(quantity));
      const price = normalizePrice(product.price);
      let addedQuantity = safeQuantity;

      const nextItems = (() => {
        const existingItem = items.find((item) => item.id === product.id);

        if (!existingItem) {
          return [
            ...items,
            {
              id: product.id,
              name: product.name,
              price,
              image_url: product.image_url,
              quantity: safeQuantity,
            },
          ];
        }

        addedQuantity = safeQuantity;
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item,
        );
      })();

      persistItems(nextItems);
      trackMetaAddToCart({
        content_ids: [product.id],
        content_type: "product",
        currency: "NGN",
        value: price * addedQuantity,
      });
    },
    [items, persistItems],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      const safeQuantity = Math.max(0, Math.floor(quantity));
      const nextItems = safeQuantity
        ? items.map((item) => (item.id === productId ? { ...item, quantity: safeQuantity } : item))
        : items.filter((item) => item.id !== productId);

      persistItems(nextItems);
    },
    [items, persistItems],
  );

  const removeItem = useCallback(
    (productId: string) => {
      persistItems(items.filter((item) => item.id !== productId));
    },
    [items, persistItems],
  );

  const clearCart = useCallback(() => {
    persistItems([]);
  }, [persistItems]);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      items,
      itemCount,
      total,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [addItem, clearCart, items, removeItem, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
