"use client"

import { Play, Plus, Star } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


export default function HeroSection({ collectionList }: { collectionList: [] }) {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 4000,
                }),
            ]}
            className="w-full max-w-full h-[600px] mx-auto">
            <CarouselContent>
                {collectionList.map(({ id, backdrop_path, title, overview }: { id: number; backdrop_path: string; title: string; media_type: string; overview: string }) => (
                    <CarouselItem className='pl-0' key={id}>
                        <div
                            className="w-full h-[650px] mx-auto relative bg-gradient-to-r from-black via-black/50 to-transparent"
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

                            <div className="relative z-10 flex items-end h-[500px] px-6 pb-6">
                                <div className="max-w-lg">
                                    <h2 className="text-5xl font-bold mb-4 text-white">{title}</h2>
                                    <p className="text-gray-300 mb-6 text-lg truncate">
                                        {overview}
                                    </p>

                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="font-semibold">4.8</span>
                                        </div>
                                        <span className="text-gray-400">2024</span>
                                        <span className="text-gray-400">2h 15m</span>
                                    </div>

                                    <div className="flex space-x-4">
                                        <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3">
                                            <Play className="w-4 h-4 mr-2 fill-current" />
                                            Play Now
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-gray-600 text-white hover:bg-gray-800 px-6 py-3 bg-transparent"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add to List
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}


