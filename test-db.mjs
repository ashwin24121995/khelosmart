import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

async function testDb() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set");
  
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not set!");
    return;
  }
  
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("Connected to database successfully!");
    
    // Check if users table exists
    const [tables] = await connection.query("SHOW TABLES");
    console.log("Tables:", tables);
    
    // Check users table structure
    const [columns] = await connection.query("DESCRIBE users");
    console.log("Users table columns:", columns);
    
    // Try to count users
    const [count] = await connection.query("SELECT COUNT(*) as count FROM users");
    console.log("User count:", count);
    
    await connection.end();
  } catch (error) {
    console.error("Database error:", error.message);
  }
}

testDb();
