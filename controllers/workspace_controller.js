import * as WorkspaceModel from "../models/workspace_model.js";

const getWorkspaces = async (req, reply) => {
  try {
    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
      return reply.status(401).send({ error: "Unauthorized - Authentication required" });
    }
    
    const userId = req.user.userId;
    const workspaces = await WorkspaceModel.getWorkspacesByUser(userId);
    return reply.send(workspaces);
  } catch (error) {
    console.error("Get workspaces error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};

const getWorkspace = async (req, reply) => {
  try {
    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
      return reply.status(401).send({ error: "Unauthorized - Authentication required" });
    }
    
    const { id } = req.params;
    const workspace = await WorkspaceModel.findWorkspaceById(id);
    if (!workspace) {
      return reply.status(404).send({ error: "Workspace not found" });
    }
    return reply.send(workspace);
  } catch (error) {
    console.error("Get workspace error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};

const addWorkspace = async (req, reply) => {
  try {
    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
      return reply.status(401).send({ error: "Unauthorized - Authentication required" });
    }
    
    // Ajouter l'ID de l'utilisateur connecté
    const workspace = {
      ...req.body,
      workspaceAuthor: req.user.userId
    };
    
    const newWorkspace = await WorkspaceModel.createWorkspace(workspace);
    return reply.status(201).send(newWorkspace);
  } catch (error) {
    console.error("Create workspace error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};

const removeWorkspace = async (req, reply) => {
  try {
    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
      return reply.status(401).send({ error: "Unauthorized - Authentication required" });
    }
    
    const { id } = req.params;
    const deletedWorkspace = await WorkspaceModel.deleteWorkspace(id);
    if (!deletedWorkspace) {
      return reply.status(404).send({ error: "Workspace not found" });
    }
    return reply.send({ message: "Workspace deleted successfully" });
  } catch (error) {
    console.error("Delete workspace error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};

const modifyWorkspace = async (req, reply) => {
  try {
    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
      return reply.status(401).send({ error: "Unauthorized - Authentication required" });
    }
    
    const { id } = req.params;
    const workspace = req.body;
    const updatedWorkspace = await WorkspaceModel.updateWorkspace(id, workspace);
    if (!updatedWorkspace) {
      return reply.status(404).send({ error: "Workspace not found" });
    }
    return reply.send(updatedWorkspace);
  } catch (error) {
    console.error("Update workspace error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
};

export {
  getWorkspaces,
  getWorkspace,
  addWorkspace,
  removeWorkspace,
  modifyWorkspace
};