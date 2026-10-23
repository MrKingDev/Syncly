
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({ // Creates your authentication system
  database: new Database("auth.db"), // connects it to SQLite

  emailAndPassword: { //turns on registration and login using email/password credentials
    enabled: true,
  },
});
