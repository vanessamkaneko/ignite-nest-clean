import { PaginationParams } from "@/core/repositories/pagination-params";
import { IAnswersRepository } from "@/domain/forum/application/repositories/IAnswers.repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer.entity";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaAnswerMapper } from "../mappers/prisma-answer-mapper";
import { IAnswerAttachmentsRepository } from "@/domain/forum/application/repositories/IAnswerAttachments.repository";
import { DomainEvents } from "@/core/events/domain-events";

@Injectable()
export class PrismaAnswersRepository implements IAnswersRepository {
  constructor(
    private prisma: PrismaService,
    private answerAttachmentsRepository: IAnswerAttachmentsRepository
  ) { }

  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      }
    })

    if (!answer) {
      return null
    }

    return PrismaAnswerMapper.toDomain(answer)
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]> {
    const answers = await this.prisma.answer.findMany({
      where: {
        questionId
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return answers.map(answer => {
      return PrismaAnswerMapper.toDomain(answer)
    })
  }

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await this.prisma.answer.create({
      data
    })

    await this.answerAttachmentsRepository.createMany(
      answer.attachments.getItems()
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)


    await Promise.all([
      this.prisma.answer.update({
        where: {
          id: data.id,
        },
        data
      }),
      this.answerAttachmentsRepository.createMany(
        answer.attachments.getNewItems()
      ),

      this.answerAttachmentsRepository.deleteMany(
        answer.attachments.getRemovedItems()
      )
    ])
  }

  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({
      where: {
        id: answer.id.toString()
      },
    })
  }
}