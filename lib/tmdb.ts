const key = process.env.NEXT_PUBLIC_TMBD_API_KEY;

export type TMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export const getMoviesFromUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    const results: TMovie[] = await responseJson.results;
    return results;
  } catch (err) {
    throw new Error("Error fetching movies");
  }
};

export const movieGenres = [
  { id: 28, genre: "Action" },
  { id: 12, genre: "Adventure" },
  { id: 16, genre: "Animation" },
  { id: 35, genre: "Comedy" },
  { id: 80, genre: "Crime" },
  { id: 99, genre: "Documentary" },
  { id: 18, genre: "Drama" },
  { id: 14, genre: "Fantasy" },
  { id: 36, genre: "History" },
  { id: 27, genre: "Horror" },
  { id: 53, genre: "Thriller" },
  { id: 37, genre: "Western" },
  { id: 878, genre: "Science Fiction" },
  { id: 9648, genre: "Mystery" },
  { id: 10402, genre: "Music" },
  { id: 10749, genre: "Romance" },
  { id: 10770, genre: "TV Movie" },
  { id: 10752, genre: "War" },
  { id: 10751, genre: "Family" },
];

export const getMovieInfo = async (movieId: number) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`;
  const response = await fetch(url);
  const responseJson: TMovie = await response.json();
  return responseJson;
};
