import { getDocumentoList , findDocumentoById , createNewDocumento , deleteDocumento , updateNewDocumento } from "../models/documento_model";

export const getDocumentos = async (req, reply) => {
  try {
    const docs = await getDocumentoList();
    return reply.send(docs);
  } catch (error) {
    console.error("Get docs error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

export const getDocumentoById = async (req, reply) => {
  const { id } = req.params;
  try {
    const doc = await findDocumentoById(id);
    if (!doc) {
      return reply.status(404).send({ error: "Document not found" });
    }
    return reply.send(doc);
  } catch (error) {
    console.error("Get doc error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

export const createDocumento = async (req, reply) => {
  const doc = req.body;
  try {
    const newDoc = await createNewDocumento(doc);
    return reply.status(201).send(newDoc);
  } catch (error) {
    console.error("Create doc error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

export const deleteDocumentoById = async (req, reply) => {
  const { id } = req.params;
  try {
    const deletedDoc = await deleteDocumento(id);
    if (!deletedDoc) {
      return reply.code(404).send({ error: "Document not found" });
    }
    return reply.code(200).send({ data: deletedDoc });
  } catch (error) {
    console.error("Delete doc error:", error);
    return reply.code(400).send({ message: error.message });
  }
}

export const updateDocumentoById = async (req, reply) => {
  const { id } = req.params;
  const doc = req.body;
  try {
    const updatedDoc = await updateNewDocumento(id, doc);
    if (!updatedDoc) {
      return reply.status(404).send({ error: "Document not found" });
    }
    return reply.send(updatedDoc);
  } catch (error) {
    console.error("Update doc error:", error);
    return reply.status(500).send({ error: "Internal server error" });
  }
}

