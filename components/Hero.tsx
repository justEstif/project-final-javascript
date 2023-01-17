"use client";
import React, { useState, useEffect } from "react";
import { requests, getMoviesFromUrl, movieGenres, TMovie } from "@/lib/tmdb";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

const Hero = ({ children }: Props) => {
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [movie, setMovie] = useState<TMovie>();

  const randomEl = (arr: TMovie[]): TMovie =>
    arr[Math.floor(Math.random() * arr.length)];

  useEffect(() => {
    const getMovies = async () => {
      const popularMovies = await getMoviesFromUrl(requests.requestPopular);
      setMovies(() => popularMovies);
      setMovie(() => randomEl(popularMovies));
    };
    getMovies();
  }, []);

  useEffect(() => {
    // slideshow
    const interval = setInterval(() => {
      setMovie(randomEl(movies));
    }, 40000);
    return () => clearInterval(interval);
  });
  return (
    <div className="overflow-hidden relative w-full h-[500px] group">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt={`https://image.tmdb.org/t/p/original/${movie?.title}` || "Poster"}
        className="block object-cover w-full"
        fill={true}
      />
      <div className="absolute top-0 right-0 w-full">{children}</div>
      <div className="container mx-auto">
        <div className="absolute bottom-0 mx-auto">
          <h1 className="text-4xl text-font-bold">{movie?.title}</h1>
          <p>{getGenre(movie)}</p>
          <p>Released: {movie?.release_date}</p>
          <p>Rating: {movie?.vote_average}</p>
          <p className="max-w-lg">{movie?.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

const getGenre = (movie: TMovie | undefined) => {
  const currentMovieGenres = movie?.genre_ids;
  if (currentMovieGenres) {
    const genresWords = movieGenres.reduce((result: string[], el) => {
      if (currentMovieGenres.includes(el.id)) {
        const movieGenre: string = el.genre!;
        result.push(movieGenre);
      }
      return result;
    }, []);

    return genresWords.join(", ");
  }
};
