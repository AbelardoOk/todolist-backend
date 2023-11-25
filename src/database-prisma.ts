import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class dbRoutes {
  async signIn(name: string, email: string) {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });
    console.log(`Usuário criado: ${user}`);
  }
}
