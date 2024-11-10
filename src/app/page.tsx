"use client";

import Image from "next/image";
import data from "@/data/mock_data.json";
import { IDRFormatter } from "@/utils";
import { create } from "zustand";

type cartType = Map<number, number>;

interface cartState {
    cart: cartType;
    addQty: (id: number) => void;
    removeQty: (id: number) => void;
}

const useCartStore = create<cartState>()((set) => ({
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
}));

interface QtyCounterProps {
    qty: number;
    handleDecrease: () => void;
    handleIncrease: () => void;
}

const QtyCounter = ({
    qty,
    handleDecrease,
    handleIncrease,
}: QtyCounterProps) => {
    if (qty === 0) {
        return (
            <button
                className="rounded-full font-bold text-sm w-8 h-8 bg-green-200"
                onClick={handleIncrease}
            >
                +
            </button>
        );
    }

    return (
        <div>
            <button onClick={handleDecrease}>{qty === 1 ? "x" : "-"}</button>
            <span>{qty}</span>
            <button onClick={handleIncrease}>+</button>
        </div>
    );
};

interface FoodItemProps {
    imgSrc: string;
    name: string;
    price: number;
    qty: number;
    handleDecrease: () => void;
    handleIncrease: () => void;
}

const FoodItem = ({
    imgSrc,
    name,
    price,
    qty,
    handleDecrease,
    handleIncrease,
}: FoodItemProps) => {
    return (
        <div className="border p-4 rounded flex gap-2">
            <div className="w-[125px] h-[125px]">
                <Image
                    className="rounded h-full object-cover"
                    src={imgSrc}
                    alt={name}
                    width={200}
                    height={200}
                />
            </div>
            <div className="flex flex-col justify-between flex-1">
                <div>
                    <p className="font-bold mb-2">{name}</p>
                    <p>{IDRFormatter.format(price).replace(/\s/g, "")}</p>
                </div>
                <div className="flex justify-end">
                    <QtyCounter
                        qty={qty}
                        handleDecrease={handleDecrease}
                        handleIncrease={handleIncrease}
                    />
                </div>
            </div>
        </div>
    );
};

export default function Home() {
    const { cart, addQty, removeQty } = useCartStore();
    const calculateTotalQty = (): number => {
        let totalQty = 0;
        cart.forEach((qty) => {
            totalQty += qty;
        });
        return totalQty;
    };
    const calculateTotalPrice = (): number => {
        let totalPrice = 0;
        cart.forEach((qty, key) => {
            const price = data.find((val) => val.id === key)?.price;
            totalPrice += price ? price * qty : 0;
        });
        return totalPrice;
    };
    return (
        <main className="p-2 relative">
            <h1 className="font-bold text-xl mb-6">Menu</h1>
            <section className="grid grid-cols-2 gap-3">
                {data.map((food) => (
                    <FoodItem
                        key={food.id}
                        imgSrc={food.picture}
                        name={food.name}
                        price={food.price}
                        qty={cart.get(food.id) || 0}
                        handleIncrease={() => {
                            addQty(food.id);
                        }}
                        handleDecrease={() => {
                            removeQty(food.id);
                        }}
                    />
                ))}
            </section>
            <div className="fixed bottom-0 p-2 bg-white">
                <button className="bg-green-200">
                    Cart{" "}
                    {cart.size === 0
                        ? ""
                        : `${calculateTotalQty()} | ${IDRFormatter.format(
                              calculateTotalPrice()
                          )}`}
                </button>
            </div>
        </main>
    );
}
