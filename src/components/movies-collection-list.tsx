import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface collectionListProps {
    collectionList: []
    collectionName: string;
    collectionType: string;
}

export default function MoviesCollectionList({ collectionList, collectionName, collectionType }: collectionListProps) {
    return (
        <div>
            <p className="text-2xl text-gray-100">{collectionName}</p>
            <div className="flex w-[96vw] overflow-x-scroll no-scrollbar">
                {collectionList?.map(
                    ({ id, poster_path, original_name, title }: { id: number; poster_path: string; original_name: string; media_type: string; title: string }) => (
                        <Link key={id} href={`/${collectionType == "movie" ? "movies" : "tv"}/` + id}>
                            <div
                                key={id}
                                className="min-w-[160px] text-gray-400 text-center m-3 cursor-pointer group"
                            >
                                <div>
                                    <img
                                        src={poster_path ? `https://www.themoviedb.org/t/p/w440_and_h660_face${poster_path}` : `/assets/No-Image-Placeholder.png`}
                                        alt={original_name || `Movie ${id}`}
                                        width={440}
                                        height={660}
                                        className="rounded w-full h-[250px] object-cover min-h-[250px] bg-white transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <p className="line-clamp-2 mt-1">{original_name || title}</p>
                            </div>
                        </Link>
                    )
                )}
            </div>
        </div>
    )
}
