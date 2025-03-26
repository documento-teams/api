import { getWorkspaces, getWorkspace, addWorkspace, removeWorkspace, modifyWorkspace } from "../controllers/workspace_controller.js";

const workspaceRoutes = async (fastify, options) => {
  // Get all workspaces
  fastify.get("/", getWorkspaces);
  
  // Get a specific workspace
  fastify.get("/:id", getWorkspace);
  
  // Create a new workspace
  fastify.post("/", addWorkspace);
  
  // Delete a workspace
  fastify.delete("/:id", removeWorkspace);
  
  // Update a workspace
  fastify.put("/:id", modifyWorkspace);
};

export default workspaceRoutes;