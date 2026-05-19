import { Router } from "express";
import bookRoutes from "../services/books/routes/index.js";
import movieRoutes from "../services/movies/routes/index.js";

const router = Router();
router.use("/api/books", bookRoutes);
router.use("/api/movies", movieRoutes);

export default router;
