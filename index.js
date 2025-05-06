import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie"; 
import dotenv from "dotenv";
import authRoutes from "./routes/auth_routes.js";
import workspaceRoutes from "./routes/workspace_routes.js";
import docRoutes from "./routes/documento_routes.js";
import authMiddleware from "./middleware/auth_middleware.js";
import prismaPlugin from "./plugins/prisma.js";

const fastify = Fastify({ logger: true });

dotenv.config();


fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET || process.env.JWT_SECRET,
});

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

fastify.register(authMiddleware);

fastify.register(cors, {
  origin: (origin, cb) => {
    const allowedOrigins = [process.env.FRONTEND_URL];
    if (allowedOrigins.includes(origin) || !origin) {
      cb(null, true);
      return;
    }
    cb(new Error("Not allowed"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,  
});

fastify.register(prismaPlugin);

fastify.register(authRoutes, { prefix: "/api/auth" });
fastify.register(workspaceRoutes, { prefix: "/api/workspaces" });
fastify.register(docRoutes, { prefix: "/api/docs" });

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log("server listening on port 3000");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

await start();
