import { login, register, forgotPassword, resetPassword } from "../controllers/auth_controller.js";

const usersRoutes = async (fastify, options) => {
  fastify.post("/login", login);
  fastify.post("/register", register);
  fastify.post("/forgot-password", forgotPassword);
  fastify.post("/reset-password", resetPassword);
};

export default usersRoutes;
