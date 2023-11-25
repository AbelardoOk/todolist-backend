import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const server = fastify();
const prisma = new PrismaClient();

server.get("/", async (request, reply) => {
  return "Hello World";
});

server.listen({ port: 3333 }, (err, adress) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor iniciado em ${adress}`);
});
