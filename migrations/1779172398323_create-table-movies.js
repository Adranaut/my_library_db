import pg from "pg";

export const shorthands = undefined;

export const up = (pgm) => {
  pgm.createTable("movies", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    title: {
      type: "TEXT",
      notNull: true,
    },
    genre: {
      type: "TEXT[]",
      notNull: true,
    },
    year: {
      type: "INTEGER",
      notNull: true,
    },
    duration: {
      type: "INTEGER",
      notNull: true,
    },
    watching: {
      type: "BOOLEAN",
      notNull: true,
    },
    inserted_at: {
      type: "TIMESTAMP",
      notNull: true,
    },
    updated_at: {
      type: "TIMESTAMP",
      notNull: true,
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable("movies");
};
