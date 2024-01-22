import express from "express";
import * as contacts from "../../models/contacts.js";
import Joi from "joi";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactList = await contacts.listContacts();
  res.status(200).json(contactList);
});

router.get("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "404 Not found!" });
  }
});

const schemaPost = Joi.object({
  username: Joi.string().required,
  email: Joi.string().email().required,
  phone: Joi.string().required,
});

router.post("/", async (req, res, next) => {
  const newContact = req.body;
  const createContact = await contacts.addContact(newContact);
  const error = schemaPost.validate(newContact);
  if (error) {
    res.status(400).json({ message: "Missing required name - field" });
  } else {
    res.status(201).json(createContact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const deleteContact = await contacts.removeContact(id);
  if (deleteContact) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "404 Not found!" });
  }
});

const schemaPut = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

router.put("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const refreshContact = req.body;
  const error = schemaPut.validate(refreshContact);
  if (error) {
    res.status(400).json({ message: "Missing fields" });
  }
  const contact = await contacts.updateContact(id, refreshContact);
  if (contact) {
    res.status(200).json(refreshContact);
  } else {
    res.status(404).json({ message: "404 Not found!" });
  }
});

module.exports = router;
