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
}
