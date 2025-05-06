import * as user_repository from "../repository/user_repository.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const login = async (req, reply) => {
  const { email, password } = req.body;
  try {
    const user = await user_repository.findUserByEmail(email);
    if (!user) {
      return reply.status(401).send({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.status(401).send({ error: "Not the same password" });
    }
    const token = generateToken({ user });
    
    reply.setCookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return reply.send({ 
      success: true,
      user: { 
        id: user.id, 
        email: user.email,
        fullname: user.fullname
      } 
    });
  } catch (error) {
    console.error("Login error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};

export const register = async (req, reply) => {
  const { email, password, fullname } = req.body;
  try {
    const user = await user_repository.findUserByEmail(email);
    if (user) {
      return reply.status(400).send({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user_repository.createUser({ email, fullname, password: hashedPassword });
    return reply
      .status(201)
      .send({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Register error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};

export const getMe = async (req, reply) => {
  try {
    if (!req.user) {
      return reply.status(401).send({ error: "Authentication required" });
    }
    
    const userId = req.user.userId;
    const user = await user_repository.findUserById(userId);
    
    if (!user) {
      return reply.status(404).send({ error: "User not found" });
    }
    
    return reply.send({
      id: user.id,
      email: user.email,
      fullname: user.fullname
    });
  } catch (error) {
    console.error("Get user error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, reply) => {
  try {
    if (!req.user) {
      return reply.status(401).send({ error: "Authentication required" });
    }
    const userId = req.user.userId;
    const deletedUser = await user_repository.deleteUser(userId);
    
    if (!deletedUser) {
      return reply.status(404).send({ error: "User not found" });
    }
    
    return reply.send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};

export const updateUser =async (req, res ) => {
  try {
    if (!req.user){
      return res.status(401).send({ error: "Authentication required" });
    }
    const userId = req.user.userId;
    const { email, fullname } = req.body;
    const updatedUser = await user_repository.updateUser(userId, { email, fullname });
  }catch (error) {
    console.error("Update user error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
}