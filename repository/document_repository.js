import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDocumentList = async () => {
  const documents = await prisma.document.findMany({
    select: {
      id: true,
      name: true,
      content: true,
      userId: true,
      workspaceId: true,
    },
  });
  return documents;
};

export const findDocumentById = async (id) => {
  try {
    const document = await prisma.document.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        content: true,
        userId: true,
        workspaceId: true,
      },
    });
    return document;
  } catch (error) {
    console.error(error);
  }
};

export const createNewDocument = async (doc) => {
  try {
    const newDoc = await prisma.document.create({
      data: doc,
    });
    return newDoc;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDocument = async (id) => {
  try {
    const deletedDoc = await prisma.document.delete({
      where: {
        id: Number(id),
      },
    });
    return deletedDoc;
  } catch (error) {
    console.error(error);
  }
};

export const updateNewDocument = async (id, doc) => {
  try {
    const updatedDoc = await prisma.document.update({
      where: {
        id: Number(id),
      },
      data: doc,
    });
    return updatedDoc;
  } catch (error) {
    console.error(error);
  }
};