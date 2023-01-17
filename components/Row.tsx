"use client";
import { getMoviesFromUrl, TMovie } from "@/lib/tmdb";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import Movie from "./Movie";

interface TProps {
  title: string;
  fetchUrl: string;
}

const Row = ({ title, fetchUrl }: TProps) => {
  const [movies, setMovies] = useState<TMovie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const receivedMovies = await getMoviesFromUrl(fetchUrl);
      setMovies(() => receivedMovies);
    };
    getMovies();
  }, []);

  return (
    <>
      <p className="text-3xl text-white">{title}</p>
      <div className="grid grid-cols-4 gap-5">
        {movies
          ? movies.map((movie) => <Movie movie={movie} key={nanoid()} />)
          : null}
      </div>
    </>
  );
};

export default Row;
