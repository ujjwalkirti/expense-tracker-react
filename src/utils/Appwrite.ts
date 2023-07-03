import { Client, Databases, Account } from "appwrite";
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64a07c0012f9da7485e1");

const databases = new Databases(client);
const account = new Account(client);

export { databases, account };
