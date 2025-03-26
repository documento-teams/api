import { getDocumentos , getDocumentoById , createDocumento , deleteDocumentoById , updateDocumentoById} from "../controllers/documento_controller";

const documentRoutes = async (fastify, options) => {
  fastify.get("/", getDocumentos);
  fastify.get("/get/:id", getDocumentoById);
  fastify.post("/createdoc", createDocumento);
  fastify.delete("/delete/:id", deleteDocumentoById);
  fastify.post("/update/:id", updateDocumentoById);
}

export default documentRoutes;