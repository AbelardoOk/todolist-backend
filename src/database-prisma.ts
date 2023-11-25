import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class dbRoutes {
  async register(name: string, email: string, password: string) {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    console.log(`Usuário criado: ${user}`);
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (password == user?.password) {
      console.log(`Seja bem vindo, ${user?.name}!`);
    } else {
      console.log("Email ou senha incorretos");
    }
  }

  async createTask(tittle: string, content: string, authorId: number) {
    await prisma.post.create({
      data: {
        tittle: tittle,
        content: content,
        state: "Pendente",
        authorId: authorId,
      },
    });

    console.log("Tarefa criada com sucesso!");
  }
}
