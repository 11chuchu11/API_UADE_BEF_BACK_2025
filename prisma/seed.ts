import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { appointments, insurances } from './mock'

const prisma = new PrismaClient().$extends(withAccelerate())

async function main() {
  await prisma.insurance.createMany({
    data: insurances
  })

  await prisma.appointment.createMany({
    data: appointments
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
