import { prisma } from '../config/prisma'

export class User {
  static async find(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      select: { email: true, name: true, image: true, googleId: true },
    })
  }

  static async create(name: string, password: string, image: string) {
    return await prisma.user.create({
      data: {
        name,
        password,
        image,
      },
    })
  }
}
