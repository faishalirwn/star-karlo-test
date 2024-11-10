"use client";

import data from "@/data/mock_data.json";
import { IDRFormatter } from "@/utils";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { FoodItem } from "@/components/FoodItem";

const CartButton = ({ show }: { show: boolean }) => {
    const { getTotalQty, getTotalPrice } = useCartStore();

    if (!show) {
        return;
    }

    return (
        <div className="fixed bottom-0 p-2 bg-white">
            <Link href="cart" className="bg-green-200">
                Cart{" "}
                {`${getTotalQty()} | ${IDRFormatter.format(getTotalPrice())}`}
            </Link>
        </div>
    );
};

export default function Home() {
    const { cart, addQty, removeQty } = useCartStore();

    return (
        <div>
            <h1 className="font-bold text-xl mb-6">
                Juna Restaurant&apos;s Menu
            </h1>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            <CartButton show={cart.size > 0} />
        </div>
    );
}
