import { IAnswerAttachmentsRepository } from "../../src/domain/forum/application/repositories/IAnswerAttachments.repository"
import { AnswerAttachment } from "../../src/domain/forum/enterprise/entities/answer-attachment.entity"

export class InMemoryAnswerAttachmentsRepository implements IAnswerAttachmentsRepository {
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.items
      .filter(item => item.answerId.toString() === answerId)

    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items
      .filter(item => item.answerId.toString() !== answerId)

      this.items = answerAttachments
  }
}