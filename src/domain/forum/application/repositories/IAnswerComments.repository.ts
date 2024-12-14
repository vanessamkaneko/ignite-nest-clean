import { PaginationParams } from "../../../../core/repositories/pagination-params"
import { AnswerComment } from "../../enterprise/entities/answer-comment.entity"

export abstract class IAnswerCommentsRepository {
  abstract create(answerComment: AnswerComment): Promise<void>
  abstract findManyByAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]>
  abstract delete(answerComment: AnswerComment): Promise<void>
  abstract findById(id: string): Promise<AnswerComment | null>
}