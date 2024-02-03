import express from "express";
import {
  getAll,
  getById,
  createNew,
  deleteById,
  updateById,
  fav,
} from "../../controllers/contact-controller.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAll);

contactsRouter.get("/:contactId", getById);

contactsRouter.post("/", createNew);

contactsRouter.delete("/:contactId", deleteById);

contactsRouter.put("/:contactId", updateById);

contactsRouter.patch("/:contactId/favorite", fav);

export default contactsRouter;
