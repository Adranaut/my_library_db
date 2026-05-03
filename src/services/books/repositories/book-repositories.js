import { Pool } from "pg";
import { nanoid } from "nanoid";

class BookRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async addBook({
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
  }) {
    const id = `book-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: "INSERT INTO books (id, isbn, title, genre, year, author, summary, publisher, page_count, read_page, reading, inserted_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id",
      values: [
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
        insertedAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getBooks({ title, reading }) {
    // const result = await this._pool.query("SELECT * FROM books");
    // return result.rows;

    let query = "SELECT * FROM books";
    const values = [];
    const conditions = [];

    if (title) {
      values.push(`%${title}%`);
      conditions.push(`title ILIKE $${values.length}`);
    }

    if (reading !== undefined) {
      const readingValue =
        reading === "1" || reading === "true" || reading === true;
      values.push(readingValue);
      conditions.push(`reading = $${values.length}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    const result = await this._pool.query(query, values);
    return result.rows;
  }

  async getBookById(id) {
    const query = {
      text: "SELECT * FROM books WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async editBookById({
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
  }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: "UPDATE books SET isbn = $1, title = $2, genre = $3, year = $4, author = $5, summary = $6, publisher = $7, page_count = $8, read_page = $9, reading = $10, updated_at = $11 WHERE id = $12 RETURNING id",
      values: [
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
        updatedAt,
        id,
      ],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async deleteBookById(id) {
    const query = {
      text: "DELETE FROM books WHERE id = $1 RETURNING id",
      values: [id],
    };
    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

export default new BookRepositories();
