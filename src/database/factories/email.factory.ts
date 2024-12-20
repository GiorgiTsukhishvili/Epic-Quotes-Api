import { faker } from '@faker-js/faker'
import { prisma } from '../../config/prisma'

export const emailFactory = async (userId: number) =>
  await prisma.email.create({
    data: {
      email: faker.internet.email(),
      isPrimary: true,
      userId,
      emailVerifiedAt: new Date().toISOString(),
    },
  })
