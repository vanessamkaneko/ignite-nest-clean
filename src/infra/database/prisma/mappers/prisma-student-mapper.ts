/* Mapper -> são classes responsáveis por converter uma entidade com o formato da camada de domínio no formato da camada
de persistência (BD) ou vice-versa ->  no nosso caso em específico isso é necessário pq os tipos de valores do BD são
diferentes do domínio */

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Student } from '@/domain/forum/enterprise/entities/student.entity';
import { User as PrismaUser, Prisma } from '@prisma/client'

export class PrismaStudentMapper {
  static toDomain(raw: PrismaUser): Student {
    return Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      }, 
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password
    }
  }
}
