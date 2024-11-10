import { IDRFormatter } from "@/utils";
import Image from "next/image";

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
            <div className=" p-2 flex gap-2">
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
