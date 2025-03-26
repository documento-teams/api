import { findUserByEmail, createUser, updateUser } from "../models/user_model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../services/email_service.js";

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

export const forgotPassword = async (req, reply) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return reply.status(404).send({ error: "Utilisateur non trouvé" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure

    await updateUser(user.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetTokenExpiry,
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendResetPasswordEmail(user.email, resetUrl);

    return reply.send({ message: "Email de réinitialisation envoyé" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return reply.status(500).send({ error: "Erreur serveur interne" });
  }
};

export const resetPassword = async (req, reply) => {
  const { token, newPassword } = req.body;
  try {
    const user = await models.User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    });

    if (!user) {
      return reply.status(400).send({ error: "Token invalide ou expiré" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUser(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return reply.send({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error("Reset password error:", error);
    return reply.status(500).send({ error: "Erreur serveur interne" });
  }
};
