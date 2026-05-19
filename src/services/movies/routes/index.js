import express from "express";
import {
  addMovie,
  getMovies,
  getMovieById,
  editMovieById,
  deleteMovieById,
} from "../controller/movie-controller.js";
import validate from "../../../middlewares/validate.js";
import { moviePayloadSchema } from "../validator/schema.js";

const router = express.Router();

router.post("/", validate(moviePayloadSchema), addMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.put("/:id", validate(moviePayloadSchema), editMovieById);
router.delete("/:id", deleteMovieById);

export default router;
