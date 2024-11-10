import Image from "next/image";
import data from "@/data/mock_data.json";
import { IDRFormatter } from "@/utils";

interface FoodItemProps {
    imgSrc: string;
    name: string;
    price: number;
}

const FoodItem = ({ imgSrc, name, price }: FoodItemProps) => {
    return (
        <div className="border p-2 rounded flex gap-2">
            <div className="w-[125px] h-[125px]">
                <Image
                    className="rounded h-full object-cover"
                    src={imgSrc}
                    alt={name}
                    width={200}
                    height={200}
                />
            </div>
            <div className="w-1/2">
                <p className="font-bold mb-2">{name}</p>
                <p>{IDRFormatter.format(price).replace(/\s/g, "")}</p>
            </div>
        </div>
    );
};

export default function Home() {
    return (
        <main className="p-2">
            <h1 className="font-bold text-xl mb-6">Menu</h1>
            <section className="grid grid-cols-2 gap-3">
                {data.map((food) => (
                    <FoodItem
                        key={food.id}
                        imgSrc={food.picture}
                        name={food.name}
                        price={food.price}
                    />
                ))}
            </section>
        </main>
    );
}
