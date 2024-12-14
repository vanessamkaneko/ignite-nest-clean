import { faker } from '@faker-js/faker'
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Student, StudentProps } from '@/domain/forum/enterprise/entities/student.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaStudentMapper } from '@/infra/database/prisma/mappers/prisma-student-mapper';

/* O override é um objeto com propriedades opcionais de StudentProps (Partial<StudentProps>); sobrescreve os valores gerados 
automaticamente pelo faker com os valores fornecidos pelo usuário, se houver; caso nenhum valor seja fornecido, todos
serão gerados pelo faker */

export function makeStudent(override: Partial<StudentProps> = {}, id?: UniqueEntityID) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override
    }, id)

  return student
}

// Para utilizar factories nos testes E2E
@Injectable()
export class StudentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)

    await this.prisma.user.create({
      data: PrismaStudentMapper.toPrisma(student)
    })

    return student
  }
}