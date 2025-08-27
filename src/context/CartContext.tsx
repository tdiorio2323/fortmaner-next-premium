import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartState, CartAction, Product, ProductVariant, CartItem } from '@/lib/types';

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = item.product.price;
    return total + (price * item.quantity);
  }, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variant, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.productId === product.id && item.variantId === variant.id
      );

      let newItems: CartItem[];
      
      if (existingItemIndex > -1) {
        // Update existing item quantity
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          productId: product.id,
          variantId: variant.id,
          quantity,
          product,
          variant
        };
        newItems = [...state.items, newItem];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: newItems.reduce((count, item) => count + item.quantity, 0)
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        item => !(item.productId === action.payload.productId && item.variantId === action.payload.variantId)
      );
      
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: newItems.reduce((count, item) => count + item.quantity, 0)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, variantId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId, variantId } });
      }

      const newItems = state.items.map(item =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      );

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: newItems.reduce((count, item) => count + item.quantity, 0)
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0
      };

    case 'LOAD_CART':
      const items = action.payload;
      return {
        items,
        total: calculateTotal(items),
        itemCount: items.reduce((count, item) => count + item.quantity, 0)
      };

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('fortmaner-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fortmaner-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, variant, quantity } });
    
    // Track Meta Pixel AddToCart event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const price = product.price;
      (window as any).fbq('track', 'AddToCart', {
        value: price * quantity,
        currency: 'USD',
        content_ids: [product.id],
        content_type: 'product'
      });
    }
  };

  const removeFromCart = (productId: string, variantId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variantId } });
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, variantId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};