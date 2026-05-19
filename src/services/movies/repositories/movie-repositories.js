import { Pool } from "pg";
import { nanoid } from "nanoid";
import cache from "../../../utils/cache.js";
import { mapMovieToModel } from "../mapping/index.js";

class MovieRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async addMovie({ title, genre, year, duration, watching }) {
    const id = `movie-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: "INSERT INTO movies (id, title, genre, year, duration, watching, inserted_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
      values: [
        id,
        title,
        genre,
        year,
        duration,
        watching,
        insertedAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);
    cache.delPattern("movies");
    return result.rows[0];
  }

  async getMovies() {
    const cacheKey = "movies:all";
    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const query = "SELECT * FROM movies";
    const result = await this._pool.query(query);
    const data = result.rows.map(mapMovieToModel);

    cache.set(cacheKey, data);
    data.forEach((item) => {
      if (item?.id) {
        cache.set(`movies:${item.id}`, item);
      }
    });

    return data;
  }

  async getMovieById(id) {
    const cacheKey = `movies:${id}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const allCache = cache.get("movies:all");
    if (Array.isArray(allCache)) {
      const item = allCache.find((row) => row.id === id);
      if (item) {
        cache.set(cacheKey, item);
        return item;
      }
      return null;
    }

    const query = {
      text: "SELECT * FROM movies WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    const data = result.rows.map(mapMovieToModel)[0];
    if (data) cache.set(cacheKey, data);
    return data;
  }

  async editMovieById({ id, title, genre, year, duration, watching }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: "UPDATE movies SET title = $1, genre = $2, year = $3, duration = $4, watching = $5, updated_at = $6 WHERE id = $7 RETURNING id",
      values: [title, genre, year, duration, watching, updatedAt, id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount || result.rowCount === 0) {
      return null;
    }
    cache.del(`movies:${id}`);
    cache.del("movies:all");
    return result.rows[0];
  }

  async deleteMovieById(id) {
    const query = {
      text: "DELETE FROM movies WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount || result.rowCount === 0) {
      return null;
    }
    cache.del(`movies:${id}`);
    cache.del("movies:all");
    return result.rows[0];
  }
}

export default new MovieRepositories();
