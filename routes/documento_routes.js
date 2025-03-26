import { getDocuments , getDocumentById , createDocument , deleteDocumentById , updateDocumentById} from "../controllers/document_controller";

const documentRoutes = async (fastify, options) => {
  fastify.get("/", getDocuments);
  fastify.get("/get/:id", getDocumentById);
  fastify.post("/createdoc", createDocument);
  fastify.delete("/delete/:id", deleteDocumentById);
  fastify.post("/update/:id", updateDocumentById);
}

export default documentRoutes;