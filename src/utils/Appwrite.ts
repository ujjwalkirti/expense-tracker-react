import { Client, Databases, Account } from "appwrite";

const APPWRITE_END_POINT = import.meta.env.VITE_APPWRITE_END_POINT;
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const client = new Client()
  .setEndpoint(APPWRITE_END_POINT)
  .setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

export { databases, account };
