import { IAnswerAttachmentsRepository } from "@/domain/forum/application/repositories/IAnswerAttachments.repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment.entity";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaAnswerAttachmentMapper } from "../mappers/prisma-answer-attachment-mapper";

@Injectable()
export class PrismaAnswerAttachmentsRepository implements IAnswerAttachmentsRepository {
  constructor(private prisma: PrismaService) { }

 async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: {
        answerId
      }
    })

    return answerAttachments.map(attachment => {
      return PrismaAnswerAttachmentMapper.toDomain(attachment)
    })
  }
  
  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        answerId
      }
    })
  }
}