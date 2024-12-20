import { faker } from '@faker-js/faker'
import { prisma } from '../../config/prisma'
import { Prisma } from '@prisma/client'

export const bookFactory = async () => {
  const user = await prisma.user.findFirst()

  await prisma.book.create({
    data: {
      name: {
        en: faker.book.title(),
        ka: faker.book.title(),
      } as Prisma.JsonObject,
      description: {
        en: faker.book.title(),
        ka: faker.book.title(),
      } as Prisma.JsonObject,
      author: {
        en: faker.person.fullName(),
        ka: faker.person.fullName(),
      } as Prisma.JsonObject,
      date: new Date().toISOString(),
      budget: '10000',
      image: `${process.env.APP_URL}/imgs/default.png`,
      userId: user!.id,
    },
  })
}
