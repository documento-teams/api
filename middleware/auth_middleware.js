
export default fp(async function (fastify, opts) {
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      const token = request.cookies.token;
      
      if (!token) {
        throw new Error('No token found in cookies');
      }
      
      const decoded = fastify.jwt.verify(token);
      request.user = decoded;
    } catch (err) {
      reply.status(401).send({ error: "Authentication required" });
    }
  });
});
