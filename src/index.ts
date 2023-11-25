import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { dbRoutes } from "./database-prisma";

const server = fastify();
const prisma = new PrismaClient();
const database = new dbRoutes();

server.get("/users", async (request, reply) => {
  return prisma.user.findMany();
});

server.post("/signin", async (request, reply) => {
  const { name, email } = request.body as any;
  console.log(name, email);

  await database.signIn(name, email);
});

server.listen({ port: 3333 }, (err, adress) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor iniciado em ${adress}`);
});
