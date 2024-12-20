import { config } from 'dotenv'

import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { DomainEvents } from '@/core/events/domain-events'
import { Redis } from 'ioredis'
import { envSchema } from '@/infra/env/env'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const env = envSchema.parse(process.env)

// GERANDO UM BD ISOLADO PARA TESTES (s/ se utilizar do bd original)

const prisma = new PrismaClient()
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})

// para gerar um database url c/ base no DATABASE_URL (no .env), alterando só o que vem após o "schema="
function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  // irá resultar em uma nova url como: postgresql://postgres:docker@localhost:5432/nest-clean?schema=986421a-54g6-66c2-f2498
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  /* nova url irá sobreescrever a url original -> assim, antes de todos os testes, o Prisma irá se conectar c/ a nova url
   ao invés da url do database original */
  process.env.DATABASE_URL = databaseURL

  DomainEvents.shouldRun = false

  await redis.flushdb() // p/ apagar registros do redis antes de cada teste

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  // excluindo o schema após os testes
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)

  await prisma.$disconnect()
})