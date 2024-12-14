import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

import { Student } from "@/domain/forum/enterprise/entities/student.entity";
import { IStudentsRepository } from "@/domain/forum/application/repositories/IStudents.repository";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";

@Injectable()
export class PrismaStudentsRepository implements IStudentsRepository {
  constructor(private prisma: PrismaService) { }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)

    await this.prisma.user.create({
      data
    })
  }
}