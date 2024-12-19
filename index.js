import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import dotenv from "dotenv";
import { connectDbSequelize } from "./database/sequelizeConnection.js";
import authRoutes from "./routes/authRoutes.js";

const fastify = Fastify({ logger: true });

dotenv.config();

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET,
});

fastify.register(authRoutes, { prefix: "/api/auth" });

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

const start = async () => {
  try {
    await connectDbSequelize();
    await fastify.listen({ port: 3000 });
    console.log("server listening on port 3000");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

await start();
