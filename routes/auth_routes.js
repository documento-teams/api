import { login, register } from "../controllers/auth_controller.js";

const usersRoutes = async (fastify, options) => {
  fastify.get("/login", login);
  fastify.get("/register", register);
};

export default usersRoutes;
