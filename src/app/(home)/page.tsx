import React from "react"
import MoviesCollectionList from "@/components/movies-collection-list";
import HeroSection from "@/components/hero-section";

async function getHomeDetails() {
    const apiKey = process.env.TMDB_MOVIE_API_KEY;
    const baseUrl = `https://api.themoviedb.org/3`;

    const endpoints = {
        trending: `${baseUrl}/trending/movie/week?api_key=${apiKey}`,
        popular: `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`,
        topRated: `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${apiKey}`,
        popularSeries: `${baseUrl}/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`,
        topRatedSeries: `${baseUrl}/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${apiKey}`,
    };

    const results = await Promise.allSettled([
        fetch(endpoints.trending),
        fetch(endpoints.popular),
        fetch(endpoints.topRated),
        fetch(endpoints.popularSeries),
        fetch(endpoints.topRatedSeries),
    ]);

    const toJson = async (res: PromiseSettledResult<Response>) =>
        res.status === "fulfilled" ? await res.value.json() : null;

    return {
        trending: await toJson(results[0]),
        popular: await toJson(results[1]),
        topRated: await toJson(results[2]),
        popularSeries: await toJson(results[3]),
        topRatedSeries: await toJson(results[4]),
    };
}

export default async function Home() {
    const home = await getHomeDetails()

    console.log(home?.popular?.results)

    return (
        <div className="">
            <HeroSection collectionList={home?.trending?.results} />
            <div className="bg-black">
                <MoviesCollectionList
                    collectionName="Trending Movies"
                    collectionType='movie'
                    collectionList={home?.trending?.results}
                />
                <MoviesCollectionList
                    collectionName="Popular Movies"
                    collectionType='movie'
                    collectionList={home?.popular?.results}
                />
                <MoviesCollectionList
                    collectionName="Top Rated Movies"
                    collectionType='movie'
                    collectionList={home?.topRated?.results}
                />
                <MoviesCollectionList
                    collectionName="Popular Series"
                    collectionType='tv'
                    collectionList={home?.popularSeries?.results}
                />
                <MoviesCollectionList
                    collectionName="Top Rated Series"
                    collectionType='tv'
                    collectionList={home?.topRatedSeries?.results}
                />
            </div>
        </div >
    );
}
