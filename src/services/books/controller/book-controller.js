import BookRepositories from "../repositories/book-repositories.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";

export const addBook = async (req, res, next) => {
  const {
    isbn,
    title,
    genre,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.validated;

  const book = await BookRepositories.addBook({
    isbn,
    title,
    genre,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  });

  if (!book) {
    return next(new InvariantError("Buku gagal ditambahkan"));
  }

  return response(res, 201, "Buku berhasil ditambahkan", book);
};

export const getBooks = async (req, res) => {
  const { title, reading } = req.query;
  const books = await BookRepositories.getBooks({ title, reading });

  if (!books || books.length === 0) {
    return response(res, 200, "Tidak ada buku yang tersedia", []);
  }

  return response(res, 200, "Buku berhasil ditampilkan", books);
};

export const getBookById = async (req, res, next) => {
  const { id } = req.params;
  const book = await BookRepositories.getBookById(id);

  if (!book) {
    return next(new NotFoundError("Buku tidak ditemukan"));
  }

  return response(res, 200, "Buku berhasil ditampilkan", book);
};

export const editBookById = async (req, res, next) => {
  const { id } = req.params;
  const {
    isbn,
    title,
    genre,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.validated;

  const book = await BookRepositories.editBookById({
    id,
    isbn,
    title,
    genre,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  });

  if (!book) {
    return next(new NotFoundError("Buku tidak ditemukan"));
  }

  return response(res, 200, "Buku berhasil diperbarui", book);
};

export const deleteBookById = async (req, res, next) => {
  const { id } = req.params;
  const book = await BookRepositories.deleteBookById(id);

  if (!book) {
    return next(new NotFoundError("Buku tidak ditemukan"));
  }

  return response(res, 200, "Buku berhasil dihapus", book);
};
