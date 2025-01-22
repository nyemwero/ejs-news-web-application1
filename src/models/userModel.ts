// src/models/userModel.ts
import pool from '../db';





// Define a User type
export type User = {
    id: number;
    username: string;
  };

  
// Get a user by username
export const getUserByUsername = async (username: string) => {
  try {
    // Query the database for the user by username
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    // If a user is found, return the user data
    if (result.rows.length > 0) {
      return result.rows[0]; // Return the first matching user
    } else {
      return null; // No user found with the provided username
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Re-throw the error to be handled at a higher level
  }
};

// Example of additional user-related functions

// Get a user by ID
export const getUserById = async (id: number) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

// Insert a new user into the database
export const createUser = async (username: string, password: string) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, password]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
