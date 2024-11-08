import Image from "next/image";

export default function Home() {
    return (
        <main>
            <h1 className="font-bold">Menu</h1>
            <section className="grid grid-cols-2 gap-3">
                <div className="border">
                    <Image
                        src="https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/79/2023/10/30/WhatsApp-Image-2023-10-30-at-110613-3771525713.jpeg"
                        alt="pizza"
                        width={60}
                        height={60}
                    />
                    <div>
                        <p>Pizza</p>
                        <p>Rp190.000</p>
                    </div>
                </div>
                <div className="border">
                    <Image
                        src="https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/79/2023/10/30/WhatsApp-Image-2023-10-30-at-110613-3771525713.jpeg"
                        alt="pizza"
                        width={60}
                        height={60}
                    />
                    <div>
                        <p>Pizza</p>
                        <p>Rp190.000</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
