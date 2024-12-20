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

    async createMany(attachments: AnswerAttachment[]): Promise<void> {
      this.items.push(...attachments)
    }
  
    async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
      const answerAttachments = this.items.filter((item) => {
        return !attachments.some((attachment) => attachment.equals(item))
      })
  
      this.items = answerAttachments
      /* O array this.items ficará com os itens que não forem iguais a nenhum item do array attachments enviado como parâmetro. */
    }
}