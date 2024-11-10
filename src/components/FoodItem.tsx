import { IDRFormatter } from "@/utils";
import Image from "next/image";
import { MaterialSymbolsDeleteRounded } from "./Icons/DeleteRounded";

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
        <div className="rounded-full border border-green-200 py-1 px-1 flex gap-4 items-center">
            <button
                onClick={handleDecrease}
                className={
                    qty > 1
                        ? "rounded-full font-bold text-sm w-8 h-8 bg-green-200"
                        : ""
                }
            >
                {qty > 1 ? (
                    "–"
                ) : (
                    <div className="rounded-full border p-1.5 bg-green-200">
                        <MaterialSymbolsDeleteRounded className="text-black" />
                    </div>
                )}
            </button>
            <span>{qty}</span>
            <button
                onClick={handleIncrease}
                className="rounded-full font-bold text-sm w-8 h-8 bg-green-200"
            >
                +
            </button>
        </div>
    );
};

export interface FoodItemProps {
    imgSrc: string;
    name: string;
    price: number;
    qty: number;
    handleDecrease: () => void;
    handleIncrease: () => void;
    cart?: boolean;
}

export const FoodItem = ({
    imgSrc,
    name,
    price,
    qty,
    handleDecrease,
    handleIncrease,
    cart = false,
}: FoodItemProps) => {
    if (cart) {
        return (
            <div className="px-2 py-4 flex gap-2 border-b">
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
    }

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
