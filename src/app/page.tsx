"use client";

import data from "@/data/mock_data.json";
import { IDRFormatter } from "@/utils";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { FoodItem } from "@/components/FoodItem";
import { MaterialSymbolsShoppingBasket } from "@/components/Icons/Cart";

const CartButton = ({ show }: { show: boolean }) => {
    const { getTotalQty, getTotalPrice } = useCartStore();

    if (!show) {
        return;
    }

    return (
        <div className="fixed bottom-0 p-2 -ml-2 bg-white w-full max-w-[768px] border-t">
            <Link href="cart">
                <div className="bg-green-200 p-3 rounded text-gray-800 font-bold w-full text-center flex items-center justify-center gap-3">
                    <MaterialSymbolsShoppingBasket />
                    <p>
                        Cart ·{" "}
                        <span className="font-normal">{getTotalQty()}</span>
                        {` · ${IDRFormatter.format(getTotalPrice())}`}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default function Home() {
    const { cart, addQty, removeQty } = useCartStore();

    return (
        <div className="pb-20">
            <h1 className="font-bold text-xl mb-6">
                Juna Restaurant&apos;s Menu
            </h1>
            <h2 className="font-bold text-lg mb-2">
                Chef&apos;s Recommendations
            </h2>
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
