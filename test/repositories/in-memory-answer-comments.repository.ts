import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment.entity";
import { PaginationParams } from "../../src/core/repositories/pagination-params";
import { IAnswerCommentsRepository } from "../../src/domain/forum/application/repositories/IAnswerComments.repository";

export class InMemoryAnswerCommentsRepository implements IAnswerCommentsRepository {
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id);

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter(item => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

      return answerComments
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex((item) => item.id === answerComment.id)

    this.items.splice(itemIndex, 1)
  }
}