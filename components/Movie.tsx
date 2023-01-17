"use client";
import useStore from "@/lib/store";
import { HeartIcon } from "@heroicons/react/24/solid";
import { TMovie } from "@/lib/tmdb";
import { useEffect, useState } from "react";
import { getLikedMovies, handleMovieLike } from "@/lib/firebase";
import Image from "next/image";

interface TProps {
  movie: TMovie;
}

const Movie = ({ movie }: TProps) => {
  const user = useStore((state) => state.user);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const liked = async ({
      docId,
      movieId,
    }: {
      docId: string;
      movieId: number;
    }) => {
      const likedMovies: number[] = await getLikedMovies(docId);
      if (likedMovies) setLiked(likedMovies.includes(movieId));
    };
    liked({ movieId: movie.id, docId: user?.docId || "" });
  }, []);

  const handleClick = async () => {
    await handleMovieLike({
      docId: user?.docId || "",
      movieId: movie.id,
      isLiked: liked,
    });
    setLiked((curr) => !curr);
  };

  return (
    <div className="overflow-hidden relative group">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
        alt={`https://image.tmdb.org/t/p/original/${movie?.title}` || "Poster"}
        className="block object-cover w-full"
        width={300}
        height={300}
      />
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100">
        <button onClick={handleClick}>
          {liked ? (
            <HeartIcon className="w-6 h-6 text-red-600" />
          ) : (
            <HeartIcon className="w-6 h-6 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Movie;
