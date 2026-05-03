import { Router } from "express";
import bookRoutes from "../services/books/routes/index.js";

const router = Router();
router.use("/books", bookRoutes);

export default router;
