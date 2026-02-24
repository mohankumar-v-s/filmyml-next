

interface Posters {
    key: string;
    name: string;
    file_path: string;
    index: string;
}

export default function PostersSection({ posters }: { posters: Posters[] }) {
    return (
        <section className="my-12">
            <h2 className="mb-4 text-xl font-bold uppercase">Posters</h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {posters.map((poster, index) => (
                    <div key={index} className="relative aspect-[2/3] overflow-hidden rounded-lg">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${poster?.file_path}`}
                            alt={`Movie poster ${index}`}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                            className="object-cover transition-transform hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
