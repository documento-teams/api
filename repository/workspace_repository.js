import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getWorkspacesList = async () => {
  const workspaces = await prisma.workspace.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return workspaces;
};

export const getWorkspacesByUser = async (userId) => {
  const workspaces = await prisma.workspace.findMany({
    where: {
      workspaceAuthorId: Number(userId),
    },
    select: {
      id: true,
      name: true,
    },
  });
  return workspaces;
};

export const findWorkspaceById = async (id) => {
  try {
    const workspace = await prisma.workspace.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
      },
    });
    return workspace;
  } catch (error) {
    console.error(error);
  }
};

export const createWorkspace = async (workspace) => {
  try {
    const newWorkspace = await prisma.workspace.create({
      data: workspace,
    });
    return newWorkspace;
  } catch (error) {
    console.error(error);
  }
};

export const deleteWorkspace = async (id) => {
  try {
    const deletedWorkspace = await prisma.workspace.delete({
      where: {
        id: Number(id),
      },
    });
    return deletedWorkspace;
  } catch (error) {
    console.error(error);
  }
};

export const updateWorkspace = async (id, workspace) => {
  try {
    const updatedWorkspace = await prisma.workspace.update({
      where: {
        id: Number(id),
      },
      data: workspace,
    });
    return updatedWorkspace;
  } catch (error) {
    console.error(error);
  }
};