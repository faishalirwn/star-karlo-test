import Image from "next/image";
import data from "@/data/mock_data.json";

export default function Home() {
    return (
        <main>
            <h1 className="font-bold">Menu</h1>
            <section className="grid grid-cols-2 gap-3">
                {data.map((food) => (
                    <div key={food.id} className="border">
                        <Image
                            src={food.picture}
                            alt={food.name}
                            width={60}
                            height={60}
                        />
                        <div>
                            <p>{food.name}</p>
                            <p>Rp{food.price}</p>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}
