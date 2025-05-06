import { login, register , getMe } from "../controllers/auth_controller.js";

const usersRoutes = async (fastify, options) => {
  fastify.post("/login", login);
  fastify.post("/register", register);
  fastify.get("/me", { onRequest: [fastify.authenticate] }, getMe);
};

export default usersRoutes;
