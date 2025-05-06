import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
  const payload = {
    userId: user.user.id,
  };
  const options = { expiresIn: "24h" };
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, options);
};

export const createInvitationLink = (id) => {
  const inviteLink = `${process.env.FRONTEND_URL}/invite?id=${id}`;
  return inviteLink;
};
