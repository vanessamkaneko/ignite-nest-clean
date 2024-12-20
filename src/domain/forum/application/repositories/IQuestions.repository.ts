import { PaginationParams } from "../../../../core/repositories/pagination-params";
import { Question } from "../../enterprise/entities/question.entity";
import { QuestionDetails } from "../../enterprise/entities/value-objects/question-details";

// era uma interface...
export abstract class IQuestionsRepository {
  abstract findById(id: string): Promise<Question | null>
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findDetailsBySlug(slug: string): Promise<QuestionDetails | null>
  abstract save(question: Question): Promise<void>
  abstract create(question: Question): Promise<void>
  abstract delete(question: Question): Promise<void>
}