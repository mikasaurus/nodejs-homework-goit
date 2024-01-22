import path from "path";
import fs from "fs/promises";

const contactsPath = path.resolve("./db/contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  console.table(contacts);
};

export const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const contact = contacts.find((item) => item.id === contactId);
  console.log(contact);
};

export const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const removedContact = contacts.find((item) => item.id === contactId);
  console.log(removedContact);
};

export const addContact = async (name, email, phone) => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const newContact = {
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  console.log(newContact);
};

export const updateContact = async (contactId, updatedData) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...updatedData };
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      console.log(contacts[index]);
    }
  } catch (error) {
    console.error(error);
  }
};
