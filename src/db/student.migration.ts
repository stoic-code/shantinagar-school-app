import Database from "tauri-plugin-sql-api";

export const studentMigration = async (db: Database) => {
  try {
    const result = await db.execute(`
      CREATE TABLE IF NOT EXISTS student (
        id INTEGER PRIMARY KEY,
        class TEXT NOT NULL,
        name TEXT NOT NULL,
        roll_no INTEGER NOT NULL,
        section TEXT NOT NULL,
        dob DATE NOT NULL,
        father_name TEXT,
        mother_name TEXT,
        address TEXT NOT NULL,
        result TEXT,
        UNIQUE (class, roll_no)
      )`);
    console.log("Table created successfully.", result);
  } catch (error) {
    console.error("Error creating table:", error);
  }
};
