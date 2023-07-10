

import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updatecCntactsStorage = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
   const data = await fs.readFile(contactsPath, "utf-8");
   return JSON.parse(data);
    // Возвращает массив контактов.
  }

  export const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
     // Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
   }
   
   export const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1) {
      return null
    }
  const [result] = contacts.splice(index, 1);
  await updatecCntactsStorage(contacts);
  return result;
    // Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
  }

  export const addContact = async ({name, email, phone}) => {

    const contacts = await listContacts();
    const newContacts = {
      id: nanoid(),
      name,
      email,
      phone
  };
  contacts.push(newContacts);
  await updatecCntactsStorage(contacts);
  return newContacts;
    //  Возвращает объект добавленного контакта. 
  }

  export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }