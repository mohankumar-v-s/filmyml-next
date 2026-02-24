"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BackDrops {
    key: string;
    name: string;
    file_path: string;
}


export default function BackdropsSection({ backdropImages }: { backdropImages: BackDrops[] }) {
    const [currentBackdrop, setCurrentBackdrop] = useState(0)

    return (
        <section className="my-12">
            <h2 className="mb-4 text-xl font-bold uppercase">Backdrops</h2>

            <div className="relative">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <img src={`https://image.tmdb.org/t/p/w500${backdropImages[currentBackdrop]?.file_path}`} alt="Movie backdrop" className="object-cover" />
                </div>

                <button
                    aria-labelledby="Left"
                    title="left"
                    className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                    onClick={() => setCurrentBackdrop((prev) => Math.max(0, prev - 1))}
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    title="right"
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                    onClick={() => setCurrentBackdrop((prev) => Math.min(4, prev + 1))}
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>

            <div className="mt-4 flex justify-center gap-2">
                {backdropImages?.map((_, index) => (
                    <button
                        key={index}
                        title="images"
                        className={`h-2 w-2 rounded-full ${currentBackdrop === index ? "bg-red-600" : "bg-gray-600"}`}
                        onClick={() => setCurrentBackdrop(index)}
                    />
                ))}
            </div>
        </section>
    )
}
