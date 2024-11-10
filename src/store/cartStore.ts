import { create } from "zustand";
import data from "@/data/mock_data.json";

export type CartType = Map<number, number>;

interface CartState {
    cart: CartType;
    tableNumber: number;
    addQty: (id: number) => void;
    removeQty: (id: number) => void;
    clearCart: () => void;
    getTotalQty: () => number;
    getTotalPrice: () => number;
    setTableNumber: (newTableNumber: number) => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
    cart: new Map<number, number>(),
    addQty: (id: number) =>
        set((state) => {
            const newCart = new Map(state.cart);
            newCart.set(id, (newCart.get(id) || 0) + 1);
            return { cart: newCart };
        }),
    removeQty: (id: number) =>
        set((state) => {
            const newCart = new Map(state.cart);
            const currentQty = newCart.get(id);
            if (currentQty && currentQty > 1) {
                newCart.set(id, currentQty - 1);
            } else {
                newCart.delete(id);
            }
            return { cart: newCart };
        }),
    clearCart: () =>
        set((state) => {
            const newCart = new Map(state.cart);
            newCart.clear();
            return { cart: newCart };
        }),
    getTotalQty: () => {
        let totalQty = 0;
        get().cart.forEach((qty) => {
            totalQty += qty;
        });
        return totalQty;
    },
    getTotalPrice: () => {
        let totalPrice = 0;
        get().cart.forEach((qty, key) => {
            const price = data.find((val) => val.id === key)?.price;
            totalPrice += price ? price * qty : 0;
        });
        return totalPrice;
    },
    tableNumber: 0,
    setTableNumber: (newTableNumber: number) =>
        set((state) => ({ tableNumber: newTableNumber })),
}));
