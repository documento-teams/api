import bcrypt from 'bcrypt';
import dotenv from "dotenv";

dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUND);

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("Generated salt :", salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Generated hashed password:", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("Error in hashPassword function:", error);
    throw error;
  }
};