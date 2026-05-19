export const mapMovieToModel = ({
  id,
  title,
  genre,
  year,
  duration,
  watching,
  inserted_at,
  updated_at,
}) => ({
  id,
  title,
  genre,
  year,
  duration,
  watching,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});
