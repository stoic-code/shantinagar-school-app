import Database from "tauri-plugin-sql-api";

export const connectdb = async () => {
  const db = await Database.load("sqlite:school.db");
  return db;
};
