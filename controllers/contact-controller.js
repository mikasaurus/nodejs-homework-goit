import * as contacts from "../models/contacts.js";
import { schemaPost, schemaPut } from "../validators/contactValidator.js";

export async function getAll(req, res, next) {
  const contactList = await contacts.listContacts();
  return res.status(200).json(contactList);
}

export async function getById(req, res, next) {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  } else {
    return res.status(404).json({ message: "404 Not found!" });
  }
}

export async function createNew(req, res, next) {
  const newContact = req.body;
  const createContact = await contacts.addContact(newContact);
  const error = schemaPost.validate(newContact);
  if (error) {
    return res.status(400).json({ message: "Missing required name - field" });
  } else {
    return res.status(201).json(createContact);
  }
}

export async function deleteById(req, res, next) {
  const { id } = req.params;
  const deleteContact = await contacts.removeContact(id);
  if (deleteContact) {
    return res.status(200).json({ message: "Contact deleted" });
  } else {
    return res.status(404).json({ message: "404 Not found!" });
  }
}

export async function updateById(req, res, next) {
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
}

export async function fav(req, res, next) {
  const { id } = req.params;
  const { fav } = req.body;
  const contact = await contacts.updateStatusContact(id, fav);
  if (contact) {
    return res.status(200);
  } else {
    return res.status(404).json({ message: "404 Not found!" });
  }
}

export const contactsController = async (req, res, next) => {};
