import response from "../../../utils/response.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import MovieRepositories from "../repositories/movie-repositories.js";

export const addMovie = async (req, res, next) => {
  const { title, genre, year, duration, watching } = req.validated;
  const movie = await MovieRepositories.addMovie({
    title,
    genre,
    year,
    duration,
    watching,
  });

  if (!movie) {
    return next(new InvariantError("Film gagal ditambahkan"));
  }
  return response(res, 201, "Film berhasil ditambahkan", movie);
};

export const getMovies = async (req, res, next) => {
  const movies = await MovieRepositories.getMovies();
  if (!movies || movies.length === 0) {
    return response(res, 200, "Tidak ada film yang tersedia", []);
  }

  return response(res, 200, "film berhasil ditampilkan", movies);
};

export const getMovieById = async (req, res, next) => {
  const { id } = req.params;
  const movie = await MovieRepositories.getMovieById(id);
  if (!movie) {
    return next(new NotFoundError("Film tidak ditemukan"));
  }
  return response(res, 200, "Film berhasil ditampilkan", movie);
};

export const editMovieById = async (req, res, next) => {
  const { title, genre, year, duration, watching } = req.validated;
  const { id } = req.params;
  const movie = await MovieRepositories.editMovieById({
    id,
    title,
    genre,
    year,
    duration,
    watching,
  });
  if (!movie) {
    return next(new NotFoundError("Film tidak ditemukan"));
  }
  return response(res, 200, "Film berhasil diperbarui", movie);
};

export const deleteMovieById = async (req, res, next) => {
  const { id } = req.params;
  const movie = await MovieRepositories.deleteMovieById(id);
  if (!movie) {
    return next(new NotFoundError("Film tidak ditemukan"));
  }
  return response(res, 200, "Film berhasil dihapus", movie);
};
