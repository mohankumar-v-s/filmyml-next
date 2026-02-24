import Image from "next/image"
import React from "react"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import CastSection from "@/components/cast-section"
import VideoSection from "@/components/video-section"
import BackdropsSection from "@/components/backdrops-section"
import PostersSection from "@/components/posters-section"
import RecommendedSection from "@/components/recommended-section"

const IMAGE_PATH = "https://www.themoviedb.org/t/p/w440_and_h660_face";

async function getMovieDetails(id: number) {
    const apiKey = process.env.TMDB_MOVIE_API_KEY;
    const baseUrl = `https://api.themoviedb.org/3/movie/${id}`;

    const endpoints = {
        details: `${baseUrl}?api_key=${apiKey}`,
        cast: `${baseUrl}/credits?api_key=${apiKey}`,
        recommendations: `${baseUrl}/recommendations?api_key=${apiKey}`,
        videos: `${baseUrl}/videos?api_key=${apiKey}`,
        images: `${baseUrl}/images?api_key=${apiKey}`
    };

    const results = await Promise.allSettled([
        fetch(endpoints.details),
        fetch(endpoints.cast),
        fetch(endpoints.recommendations),
        fetch(endpoints.videos),
        fetch(endpoints.images)
    ]);

    const toJson = async (res: PromiseSettledResult<Response>) =>
        res.status === "fulfilled" ? await res.value.json() : null;

    return {
        details: await toJson(results[0]),
        cast: await toJson(results[1]),
        recommendations: await toJson(results[2]),
        videos: await toJson(results[3]),
        images: await toJson(results[4])
    };
}



export default async function MovieDetails({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const { id } = await params

    const movies = await getMovieDetails(id);

    return (
        <div className="bg-[#111827] h-full max-w-screen">
            <div className="min-h-screen py-12 bg-black text-white">
                <main className="container mx-auto px-4">
                    <div className="relative mt-10 flex flex-col lg:flex-row md:items-start lg:gap-8">
                        <div className="relative mb-6 flex-shrink-0 md:mb-0 md:w-full lg:w-1/4">
                            <Image
                                src={`${movies?.details?.poster_path ? IMAGE_PATH + movies?.details?.poster_path : "/assets/No-Image-Placeholder.png"}`}
                                alt={movies?.details?.title || "Movie Poster"}
                                width={300}
                                height={450}
                                className="rounded-lg mx-auto"
                                priority
                                unoptimized={true}
                            />
                        </div>

                        <div className="flex-grow">
                            <h1 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">{movies?.details?.title}</h1>

                            <div className="my-4 sm:flex items-center gap-4">
                                <div className="flex items-center gap-1 my-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-400">{movies?.details?.runtime} min</span>
                                </div>
                                {movies?.details?.genres.map((data: { id: React.Key; name: string }) => (
                                    <Button
                                        key={data.id}
                                        variant="outline"
                                        size="sm"
                                        className="rounded-full border-green-600 bg-transparent text-green-600 hover:bg-green-600 hover:text-white mr-2"
                                    >
                                        {data.name}
                                    </Button>
                                ))}
                            </div>
                            <p className="mb-6 text-gray-300 max-w-4xl">
                                {movies?.details?.overview || "No description available."}
                            </p>

                            {/* <Button className="mb-8 bg-green-600 hover:bg-green-700">
                                <Play className="mr-2 h-4 w-4" />
                                WATCH NOW
                            </Button> */}

                            <CastSection castMembers={movies?.cast?.cast.slice(0, 20) || []} />
                        </div>
                    </div>

                    {movies?.videos?.results?.length > 0 && <VideoSection movieVideos={movies?.videos?.results?.slice(0, 5) || []} />}
                    <BackdropsSection backdropImages={movies?.images?.backdrops?.slice(0, 5) || []} />
                    <PostersSection posters={movies?.images?.posters?.slice(0, 5) || []} />
                    <RecommendedSection recommendedMovies={movies?.recommendations?.results || []} />
                </main>
            </div>
        </div>
    )
}