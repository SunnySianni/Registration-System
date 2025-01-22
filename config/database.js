import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Sequelize
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Set to true for debugging SQL queries
  }
);

// Function to connect to the database
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit process on failure
  }
};

// Utility function to execute raw SQL queries
export const query = async (sql, replacements = []) => {
  try {
    const [results] = await sequelize.query(sql, { replacements });
    return results;
  } catch (error) {
    console.error('Query execution failed:', error);
    throw error;
  }
};

