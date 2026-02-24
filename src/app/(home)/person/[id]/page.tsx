import React from "react";
import Link from "next/link";

const IMAGE_PATH = "https://image.tmdb.org/t/p/w440_and_h660_face";

async function getPersonDetails(id: number) {
  const apiKey = process.env.TMDB_MOVIE_API_KEY;
  const baseUrl = `https://api.themoviedb.org/3/person/${id}`;

  const endpoints = {
    details: `${baseUrl}?api_key=${apiKey}`,
    credits: `${baseUrl}/combined_credits?api_key=${apiKey}`,
    images: `${baseUrl}/images?api_key=${apiKey}`,
  };

  const results = await Promise.allSettled([
    fetch(endpoints.details),
    fetch(endpoints.credits),
    fetch(endpoints.images),
  ]);

  const toJson = async (res: PromiseSettledResult<Response>) =>
    res.status === "fulfilled" ? await res.value.json() : null;

  return {
    details: await toJson(results[0]),
    credits: await toJson(results[1]),
    images: await toJson(results[2]),
  };
}

interface CreditItem {
  id: number;
  media_type: "movie" | "tv" | string;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_count?: number;
}

interface PersonImage {
  file_path: string;
  aspect_ratio: number;
  height: number;
  width: number;
  vote_average: number;
  vote_count: number;
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const data = await getPersonDetails(id);

  const person = data?.details;
  const credits: CreditItem[] = data?.credits?.cast || [];

  // remove duplicate credits based on id + media_type
  const uniqueCredits: CreditItem[] = Array.from(
    new Map(credits.map((c) => [c.id + c.media_type, c])).values()
  );

  // filter credits with vote_count > 14000
  const filteredCredits = uniqueCredits.filter((c) => (c.vote_count || 0) > 5000);

  return (
    <div className="bg-[#111827] h-full max-w-screen">
      <div className="min-h-screen py-12 bg-black text-white">
        <main className="container mx-auto px-4">
          <div className="relative mt-10 flex flex-col lg:flex-row md:items-start lg:gap-8">
            <div className="relative mb-6 flex-shrink-0 md:mb-0 md:w-full lg:w-1/4">
              <img
                src={
                  person?.profile_path
                    ? IMAGE_PATH + person.profile_path
                    : "/assets/No-Image-Placeholder.png"
                }
                alt={person?.name || "Profile"}
                width={300}
                height={450}
                className="rounded-lg mx-auto"
              />
            </div>

            <div className="flex-grow">
              <h1 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">
                {person?.name}
              </h1>

              {person?.birthday && (
                <p className="text-sm text-gray-400">
                  Born: {person.birthday}
                </p>
              )}
              {person?.place_of_birth && (
                <p className="text-sm text-gray-400">
                  Place of birth: {person.place_of_birth}
                </p>
              )}

              <div className="mb-6 text-gray-300 max-w-4xl space-y-3">
                {person?.biography
                  ? (() => {
                      const sentences = person.biography
                        .split(/[.!?]+\s+/)
                        .filter((s: string) => s.trim());
                      const paragraphs = [];
                      for (let i = 0; i < sentences.length; i += 3) {
                        paragraphs.push(sentences.slice(i, i + 3).join(" "));
                      }
                      return (
                        <>
                          {paragraphs.map((para: string, idx: number) => (
                            <p key={idx}>{para.trim()}.</p>
                          ))}
                        </>
                      );
                    })()
                  : <p>Biography not available.</p>}
              </div>
            </div>
          </div>

          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold uppercase">Filmography</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredCredits.map((credit) => (
                <Link
                  key={credit.id + credit.media_type}
                  href={`/${credit.media_type === "tv" ? "tv" : "movies"}/${credit.id}`}
                  className="block bg-white text-black rounded overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={
                      credit.poster_path
                        ? `https://image.tmdb.org/t/p/w342${credit.poster_path}`
                        : "/assets/No-Image-Placeholder.png"
                    }
                    alt={credit.title || credit.name || ""}
                    className="w-full h-80 object-cover"
                  />
                  <p className="p-2 text-xs truncate">
                    {credit.title || credit.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {data?.images?.profiles && data.images.profiles.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-xl font-bold uppercase">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.images.profiles
                  .filter((img: PersonImage) => (img.vote_count || 0) > 5)
                  .sort((a: PersonImage, b: PersonImage) => (b.vote_count || 0) - (a.vote_count || 0))
                  .slice(0, 5)
                  .map((image: PersonImage, idx: number) => (
                  <div key={idx} className="relative aspect-[2/3] overflow-hidden rounded-lg">
                    <img
                      src={`https://image.tmdb.org/t/p/w342${image.file_path}`}
                      alt={`Gallery ${idx}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
