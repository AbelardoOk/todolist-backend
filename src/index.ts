import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { dbRoutes } from "./database-prisma";

const server = fastify();
const prisma = new PrismaClient();
const database = new dbRoutes();

// Login/Registro

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

// Tasks

server.get<{ Params: { id: number } }>("/tasks/:id", async (request, reply) => {
  const userId: number = Number(request.params.id);
  return prisma.post.findMany({
    where: {
      authorId: userId,
    },
  });
});

server.post<{ Params: { id: number } }>("/createtask/:id", async (request, reply) => {
  const authorId: number = Number(request.params.id);
  const { tittle, content } = request.body as any;

  await database.createTask(tittle, content, authorId);
});

server.delete<{ Params: { id1: number; id2: number } }>("/deletetask/:id1/:id2", async (request, reply) => {
  const authorId: number = Number(request.params.id1);
  const taskId: number = Number(request.params.id2);

  await prisma.post.delete({
    where: {
      id: taskId,
      authorId: authorId,
    },
  });
});

server.put<{ Params: { id1: number; id2: number } }>("/completed/:id1/:id2", async (request, reply) => {
  const authorId: number = Number(request.params.id1);
  const taskId: number = Number(request.params.id2);

  await prisma.post.update({
    where: { id: taskId, authorId: authorId },
    data: { state: "completa" },
  });
});

server.post<{ Params: { id: number } }>("/search/:id", async (request, reply) => {
  const authorId: number = Number(request.params.id);
  const { search } = request.body as any;

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: authorId,
        tittle: {
          contains: search,
        },
        content: {
          contains: search,
        },
      },
    });

    return posts;
  } catch (error) {
    console.error("Erro na consulta:", error);
    reply.status(500).send("Erro interno do servidor");
  }
});

// Host
server.listen({ port: 3333 }, (err, adress) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor iniciado em ${adress}`);
});
