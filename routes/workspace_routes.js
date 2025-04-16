import { getWorkspaces, getWorkspace, addWorkspace, removeWorkspace, modifyWorkspace } from "../controllers/workspace_controller.js";

const workspaceRoutes = async (fastify, options) => {

  fastify.get("/", getWorkspaces);
  
  fastify.get("/:id", getWorkspace);
  
  fastify.post("/", addWorkspace);
  
  fastify.delete("/:id", removeWorkspace);
  
  fastify.put("/:id", modifyWorkspace);
};

export default workspaceRoutes;