import { faker } from '@faker-js/faker'
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { QuestionAttachment, QuestionAttachmentProps } from '../../src/domain/forum/enterprise/entities/question-attachment.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

export function makeQuestionAttachment(override: Partial<QuestionAttachmentProps> = {}, id?: UniqueEntityID) {
  const questionAttachment = QuestionAttachment.create({
    questionId: new UniqueEntityID(),
    attachmentId: new UniqueEntityID(),
    ...override
  }, id)

  return questionAttachment
}

// Para utilizar factories nos testes E2E
@Injectable()
export class QuestionAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionAttachment(data: Partial<QuestionAttachmentProps> = {}): Promise<QuestionAttachment> {
    const questionAttachment = makeQuestionAttachment(data)

    await this.prisma.attachment.update({
      where: {
        id: questionAttachment.attachmentId.toString()
      },
      data: {
        questionId: questionAttachment.questionId.toString()
      }
    })

    return questionAttachment
  }
}