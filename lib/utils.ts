import { TMovie, movieGenres } from "./tmdb";

export const randomEl = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const getGenre = (movie: TMovie | undefined) => {
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
