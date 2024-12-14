import { PaginationParams } from "@/core/repositories/pagination-params";
import { IQuestionsRepository } from "@/domain/forum/application/repositories/IQuestions.repository";
import { Question } from "@/domain/forum/enterprise/entities/question.entity";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaQuestionMapper } from "../mappers/prisma-question-mapper";
import { IQuestionAttachmentsRepository } from "@/domain/forum/application/repositories/IQuestionAttachments.repository";

@Injectable()
export class PrismaQuestionsRepository implements IQuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private questionAttachmentsRepository: IQuestionAttachmentsRepository
  ) { }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      }
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      }
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return questions.map(question => {
      return PrismaQuestionMapper.toDomain(question)
    })
  }

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.create({
      data
    })

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getItems()
    )
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await Promise.all([
      this.prisma.question.update({
        where: {
          id: data.id,
        },
        data
      }),

      this.questionAttachmentsRepository.createMany(
        question.attachments.getNewItems()
      ),

      this.questionAttachmentsRepository.deleteMany(
        question.attachments.getRemovedItems()
      )
    ])
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    })
  }
}