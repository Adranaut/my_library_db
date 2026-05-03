import express from "express";
import {
  addBook,
  getBooks,
  getBookById,
  editBookById,
  deleteBookById,
} from "../controller/book-controller.js";
import validate from "../../../middlewares/validate.js";
import {
  bookPayloadSchema,
  bookUpdatePayloadSchema,
  bookQuerySchema,
} from "../validator/schema.js";

const router = express.Router();

router.post("/", validate(bookPayloadSchema), addBook);
router.get("/", validate(bookQuerySchema), getBooks);
router.get("/:id", getBookById);
router.put("/:id", validate(bookUpdatePayloadSchema), editBookById);
router.delete("/:id", deleteBookById);

export default router;
