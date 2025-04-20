import Image from "next/image"
import Link from "next/link";

interface Movie {
    poster_path?: string;
    title: string;
    id: string;
    media_type: string;
    original_name: string;
}

interface RecommendedSectionProps {
    recommendedMovies: Movie[];
}

export default function RecommendedSection({ recommendedMovies }: RecommendedSectionProps) {
    return (
        <section className="my-12">
            <h2 className="mb-4 text-xl font-bold uppercase">You May Also Like</h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {recommendedMovies.map((movie, index) => (
                    <Link key={index} href={`/${movie.media_type == "movie" ? "movies" : "tv"}/${movie.id}`}>
                        <div className="group cursor-pointer">
                            <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                                <Image
                                    src={
                                        movie.poster_path
                                            ? `https://www.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`
                                            : "/assets/No-Image-Placeholder.png"
                                    }
                                    alt={movie.title || movie.original_name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                            <h3 className="mt-2 text-sm font-medium">{movie.title || movie.original_name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
