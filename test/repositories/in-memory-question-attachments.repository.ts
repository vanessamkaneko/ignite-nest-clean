import { PaginationParams } from "../../src/core/repositories/pagination-params"
import { IQuestionAttachmentsRepository } from "../../src/domain/forum/application/repositories/IQuestionAttachments.repository"
import { QuestionAttachment } from "../../src/domain/forum/enterprise/entities/question-attachment.entity"

export class InMemoryQuestionAttachmentsRepository implements IQuestionAttachmentsRepository {

  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items
      .filter((item) => item.questionId.toString() === questionId)

    return questionAttachments
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items
      .filter((item) => item.questionId.toString() !== questionId)

    this.items = questionAttachments
  }


  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const questionAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    })

    this.items = questionAttachments
    /* O array this.items ficará com os itens que não forem iguais a nenhum item do array attachments enviado como parâmetro. */
  }
}