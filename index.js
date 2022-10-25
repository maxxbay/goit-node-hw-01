import { Command } from "commander";
import contactOperations from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactAll = await contactOperations.listContacts();
      console.table(contactAll);
      break;

    case "get":
      const contactOne = await contactOperations.getContactById(id);
      console.log(contactOne);
      break;

    case "add":
      const addContact = await contactOperations.addContact({
        name,
        email,
        phone,
      });
      console.log(addContact);
      break;

    case "remove":
      const removeById = await contactOperations.removeContact(id);
      console.log(removeById);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
