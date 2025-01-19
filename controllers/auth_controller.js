import { findUserByEmail, createUser } from "../models/user_model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const login = async (req, reply) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return reply.status(401).send({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.status(401).send({ error: "Not the same password" });
    }
    const token = generateToken({ user });
    return reply.send({ token, id: user.id });
  } catch (error) {
    console.error("Login error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};

export const register = async (req, reply) => {
  const { email, password, fullname } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      return reply.status(400).send({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ email, fullname, password: hashedPassword });
    return reply
      .status(201)
      .send({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Register error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};
