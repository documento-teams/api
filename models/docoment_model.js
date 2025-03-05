import { models } from "../database/models/index.js";

export const getDocumentList = async () => {
  const documents = await models.Document.findAll({
    attributes: ["id", "name", "content", "userId", "workspaceId"],
  });
  return documents;
}

export const findDocumentById = async (id) => {
  try {
    const document = await models.Document.findOne({
      where: {
        id,
      },
      attributes: ["id", "name", "content", "userId", "workspaceId"],
    });
    return document;
  } catch (error) {
    console.error(error);
  }
};

export const createNewDocument = async (doc) => {
  try {
    const newDoc = await models.Document.create(doc);
    return newDoc;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDocument = async (id) => {
  try {
    const deletedDoc = await models.Document.destroy({
      where: {
        id,
      },
      returning: true,
    });
    return deletedDoc;
  } catch (error) {
    console.error(error);
  }
}

export const updateNewDocument = async (id, doc) => {
  try {
    const updatedDoc = await models.Document.update(doc, {
      where: {
        id,
      },
      returning: true,
    });
    return updatedDoc;
  } catch (error) {
    console.error(error);
  }
};