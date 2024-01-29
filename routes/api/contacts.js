import express from "express";
import * as contacts from "../../models/contacts.js";
import Joi from "joi";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  const contactList = await contacts.listContacts();
  return res.status(200).json(contactList);
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  } else {
    return res.status(404).json({ message: "404 Not found!" });
  }
});

const schemaPost = Joi.object({
  username: Joi.string().required,
  email: Joi.string().email().required,
  phone: Joi.string().required,
});

contactsRouter.post("/", async (req, res, next) => {
  const newContact = req.body;
  const createContact = await contacts.addContact(newContact);
  const error = schemaPost.validate(newContact);
  if (error) {
    return res.status(400).json({ message: "Missing required name - field" });
  } else {
    return res.status(201).json(createContact);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const deleteContact = await contacts.removeContact(id);
  if (deleteContact) {
    return res.status(200).json({ message: "Contact deleted" });
  } else {
    return res.status(404).json({ message: "404 Not found!" });
  }
});

const schemaPut = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const refreshContact = req.body;
  const error = schemaPut.validate(refreshContact);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const contact = await contacts.updateContact(id, refreshContact);
  if (contact) {
    return res.status(200).json(refreshContact);
  } else {
    return res.status(404).json({ message: "404 Not found!" });
  }
});

contactsRouter.patch("/:contactId/favorite", async (req, res, next) => {
  const { id } = req.params;
  const { fav } = req.body;
  const contact = await contacts.updateStatusContact(id, fav);
  if (contact) {
    return res.status(200);
  } else {
    return res.status(404).json({ message: "404 Not found!" });
  }
});

export default contactsRouter;
