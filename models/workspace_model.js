import { models } from "../database/models/index.js";

const getWorkspacesList = async () => {
  const workspaces = await models.Workspace.findAll({
    attributes: ["id", "name"],
  });
  return workspaces;
}

const findWorkspaceById = async (id) => {
  try {
    const workspace = await models.Workspace.findOne({
      where: {
        id,
      },
      attributes: ["id", "name"],
    });
    return workspace;
  } catch (error) {
    console.error(error);
  }
}

const createWorkspace = async (workspace) => {
  try {
    const newWorkspace = await models.Workspace.create(workspace);
    return newWorkspace;
  } catch (error) {
    console.error(error);
  }
}


const deleteWorkspace = async (id) => {
  try {
    const deletedWorkspace = await models.Workspace.destroy({
      where: {
        id,
      },
      returning: true,
    });
    return deletedWorkspace;
  } catch (error) {
    console.error(error);
  }
}


const updateWorkspace = async (id, workspace) => {
  try {
    const updatedWorkspace = await models.Workspace.update(workspace, {
      where: {
        id,
      },
      returning: true,
    });
    return updatedWorkspace;
  } catch (error) {
    console.error(error);
  }
}

export {
  getWorkspacesList,
  findWorkspaceById,
  createWorkspace,
  deleteWorkspace,
  updateWorkspace,
};
