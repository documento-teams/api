import { getDocumentList , findDocumentById , createNewDocument , deleteDocument , updateNewDocument } from "../models/docoment_model";

export const getDocuments = async (req, reply) => {
  try {
    const docs = await getDocumentList();
    return reply.send(docs);
  } catch (error) {
    console.error("Get docs error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

export const getDocumentById = async (req, reply) => {
  const { id } = req.params;
  try {
    const doc = await findDocumentById(id);
    if (!doc) {
      return reply.status(404).send({ error: "Document not found" });
    }
    return reply.send(doc);
  } catch (error) {
    console.error("Get doc error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

export const createDocument = async (req, reply) => {
  const doc = req.body;
  try {
    const newDoc = await createNewDocument(doc);
    return reply.status(201).send(newDoc);
  } catch (error) {
    console.error("Create doc error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

export const deleteDocumentById = async (req, reply) => {
  const { id } = req.params;
  try {
    const deletedDoc = await deleteDocument(id);
    if (!deletedDoc) {
      return reply.status(404).send({ error: "Document not found" });
    }
    return reply.send(deletedDoc);
  } catch (error) {
    console.error("Delete doc error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

export const updateDocumentById = async (req, reply) => {
  const { id } = req.params;
  const doc = req.body;
  try {
    const updatedDoc = await updateNewDocument(id, doc);
    if (!updatedDoc) {
      return reply.status(404).send({ error: "Document not found" });
    }
    return reply.send(updatedDoc);
  } catch (error) {
    console.error("Update doc error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

