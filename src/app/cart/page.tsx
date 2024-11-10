"use client";

import Link from "next/link";
import data from "@/data/mock_data.json";
import { CartType, useCartStore } from "@/store/cartStore";
import { FoodItem } from "@/components/FoodItem";
import { FC } from "react";
import { IDRFormatter } from "@/utils";
import { useRouter } from "next/navigation";
import { MaterialSymbolsArrowBackRounded } from "@/components/Icons/ArrowBack";

const CartItems: FC<{ cart: CartType }> = ({ cart }) => {
    const { addQty, removeQty } = useCartStore();

    if (cart.size === 0) {
        return;
    }

    return (
        <>
            {Array.from(cart.entries()).map(([key, qty]) => {
                const item = data.find((val) => val.id === key);
                return (
                    item && (
                        <FoodItem
                            cart
                            key={item.id}
                            imgSrc={item.picture}
                            name={item.name}
                            price={item.price}
                            qty={qty}
                            handleIncrease={() => addQty(item.id)}
                            handleDecrease={() => removeQty(item.id)}
                        />
                    )
                );
            })}
        </>
    );
};

export default function Cart() {
    const { cart, clearCart, getTotalPrice, tableNumber, setTableNumber } =
        useCartStore();
    const router = useRouter();

    const handleOrder = () => {
        if (isNaN(tableNumber) || tableNumber === 0) {
            alert("Please input your table number");
            return;
        }
        const confirmOrder = confirm("Are you ready to place your order?");
        if (confirmOrder) {
            alert(
                "Order Confirmed! Thank you for your order! We'll start preparing it right away. You'll receive a notification when your order is ready."
            );
            clearCart();
            router.push("/");
        }
    };

    return (
        <div className="relative min-h-screen pb-32">
            <header className="flex items-center border-b mb-5 py-3 px-3">
                <Link href="/" className="inline-block flex-1">
                    <MaterialSymbolsArrowBackRounded />
                </Link>
                <p>Cart</p>
                <div className="flex-1"></div>
            </header>
            {cart.size > 0 && (
                <>
                    <div className="relative mb-5">
                        <label
                            className="absolute text-xs left-3 top-2"
                            htmlFor="table"
                        >
                            Table No.
                        </label>
                        <input
                            className="border pt-5 pb-1.5 px-3 w-20 rounded-2xl"
                            onChange={(e) => {
                                setTableNumber(parseInt(e.target.value));
                            }}
                            value={tableNumber}
                            id="table"
                            name="table"
                            type="number"
                        />
                    </div>
                    <h2 className="text-lg font-bold mb-2">Order Summary</h2>
                </>
            )}
            <CartItems cart={cart} />
            {cart.size === 0 && (
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    Add something to the cart to start ordering
                </p>
            )}
            {cart.size > 0 && (
                <div className="fixed bottom-0 p-2 -ml-2 bg-white w-full max-w-[768px] border-t">
                    <div className="flex justify-between pt-3 pb-4">
                        <p>Total</p>
                        <p className="font-bold">
                            {IDRFormatter.format(getTotalPrice()).replace(
                                /\s/g,
                                ""
                            )}
                        </p>
                    </div>
                    <button
                        className="bg-green-200 p-3 rounded text-gray-800 font-bold w-full text-center flex items-center justify-center gap-3"
                        onClick={handleOrder}
                    >
                        Order
                    </button>
                </div>
            )}
        </div>
    );
}
