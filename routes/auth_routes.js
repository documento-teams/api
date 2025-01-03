import { login, register } from "../controllers/auth_controller.js";

const usersRoutes = async (fastify, options) => {
  fastify.post("/login", login);
  fastify.post("/register", register);
};

export default usersRoutes;
