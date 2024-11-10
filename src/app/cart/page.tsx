"use client";

import Link from "next/link";
import data from "@/data/mock_data.json";
import { CartType, useCartStore } from "@/store/cartStore";
import { FoodItem } from "@/components/FoodItem";
import { FC } from "react";
import { IDRFormatter } from "@/utils";
import { useRouter } from "next/navigation";

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
        <div>
            <Link href="/">Back</Link>
            {cart.size > 0 && (
                <div>
                    <label htmlFor="table">Table No.</label>
                    <input
                        className="border p-1 w-14"
                        onChange={(e) => {
                            setTableNumber(parseInt(e.target.value));
                        }}
                        value={tableNumber}
                        id="table"
                        name="table"
                        type="number"
                    />
                </div>
            )}
            <CartItems cart={cart} />
            {cart.size === 0 && (
                <p>Add something to the cart to start ordering</p>
            )}
            {cart.size > 0 && (
                <>
                    <p>
                        Total:{" "}
                        {IDRFormatter.format(getTotalPrice()).replace(
                            /\s/g,
                            ""
                        )}
                    </p>
                    <button onClick={handleOrder}>Order</button>
                </>
            )}
        </div>
    );
}
