
import contactsService from "./db/contact.js";

import {program} from "commander";


const invokeAction = async ({action, id, name, email, phone}) => {
  switch (action) {
    case "list":
     const allContacts = await contactsService.listContacts();
     return console.table(allContacts);
     break;

     case "get":
      const getContacts = await contactsService.getContactById(id);
      return console.log(getContacts);
      break;

      case "remove":
        const removeContacts = await contactsService.removeContact(id);
        return console.log(removeContacts);
        break;

        case 'add':
        const addContacts = await contactsService.addContact({name, email, phone});
        return console.log(addContacts);

          break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

  program.parse();

  const options = program.opts();
  invokeAction(options);