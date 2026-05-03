export const shorthands = undefined;

export const up = (pgm) => {
  pgm.createTable("books", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    isbn: {
      type: "VARCHAR(20)",
      notNull: true,
      unique: true,
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
    author: {
      type: "TEXT",
      notNull: true,
    },
    summary: {
      type: "TEXT",
      notNull: false,
    },
    publisher: {
      type: "TEXT",
      notNull: true,
    },
    page_count: {
      type: "INTEGER",
      notNull: true,
    },
    read_page: {
      type: "INTEGER",
      notNull: true,
    },
    reading: {
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
  pgm.dropTable("books");
};
