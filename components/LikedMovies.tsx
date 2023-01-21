"use client";
import useStore from "@/lib/store";
import { getLikedMovies } from "@/lib/firebase";
import { getMovieInfo, TMovie } from "@/lib/tmdb";
import { useEffect, useState } from "react";
import Movie from "@/components/Movie";
import { nanoid } from "nanoid";

type Props = {};

const LikedMovies = ({}: Props) => {
  const user = useStore((state) => state.user);
  const [likedMovies, setLikedMovies] = useState<TMovie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const likedMoviesId: number[] = await getLikedMovies(user?.docId || "");
      const movies = await Promise.all(
        likedMoviesId.map(async (id) => await getMovieInfo(id))
      );
      setLikedMovies(movies);
    };
    user && getMovies();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-5">
      {user ? (
        likedMovies ? (
          likedMovies.map((movie) => <Movie movie={movie} key={nanoid()} />)
        ) : (
          <div>Like movies to see here</div>
        )
      ) : (
        <div>Login to see</div>
      )}
    </div>
  );
};

export default LikedMovies;
