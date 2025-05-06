import * as authController from "../controllers/auth_controller.js";

const usersRoutes = async (fastify, options) => {
  fastify.post("/login", authController.login);
  fastify.post("/register", authController.register);
  fastify.get("/me", { onRequest: [fastify.authenticate] }, authController.getMe);
  fastify.delete("/delete", { onRequest: [fastify.authenticate]}, authController.deleteUser);
  fastify.put("/update", { onRequest: [fastify.authenticate]}, authController.updateUser);
};

export default usersRoutes;
