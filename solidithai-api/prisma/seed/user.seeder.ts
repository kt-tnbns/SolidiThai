import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../../src/common/utils/hash'
const prisma = new PrismaClient()

async function seed() {
  console.log('Seeding users...')

  try {
    for (let i = 0; i < 60; i++) {
      await prisma.user.create({
        data: {
          email: faker.internet.email().toLowerCase(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          password: hashPassword(
            faker.internet.password({
              length: 10,
            }),
          ),
        },
      })
    }

    console.log('Users seeded successfully')

    await prisma.user.create({
      data: {
        email: 'admin@solidithai.com',
        firstName: 'Admin',
        lastName: 'SolidiThai',
        password: hashPassword('P@ssw0rd'),
      },
    })

    await prisma.$disconnect()
  } catch (error) {
    console.error(error)
    await prisma.$disconnect()
  }
}

seed()
