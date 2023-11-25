import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { dbRoutes } from "./database-prisma";

const server = fastify();
const prisma = new PrismaClient();
const database = new dbRoutes();

server.get("/users", async (request, reply) => {
  return prisma.user.findMany();
});

server.post("/register", async (request, reply) => {
  const { name, email, password } = request.body as any;
  console.log(name, email);

  await database.register(name, email, password);
});

server.post("/login", async (request, reply) => {
  const { email, password } = request.body as any;
  console.log(email, password);

  await database.login(email, password);
});

server.listen({ port: 3333 }, (err, adress) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor iniciado em ${adress}`);
});
