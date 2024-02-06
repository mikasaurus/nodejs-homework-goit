import { Contact } from "../schema/contact.js";

export const listContacts = async () => {
  await Contact.find();
};

export const getContactById = async (contactId) => {
  await Contact.findOne({ _id: contactId });
};

export const removeContact = async (contactId) => {
  await Contact.findByIdAndDelete({ _id: contactId });
};

export const addContact = async (body) => {
  await Contact.create(body);
};

export const updateContact = async (contactId, body) => {
  await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

export const updateStatusContact = async (contactId, fav) => {
  await Contact.findByIdAndUpdate(
    { _id: contactId },
    { new: true },
    { $set: { fav: fav } }
  );
};
