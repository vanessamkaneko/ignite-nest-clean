import { PaginationParams } from "../../../../core/repositories/pagination-params";
import { Question } from "../../enterprise/entities/question.entity";

// era uma interface...
export abstract class IQuestionsRepository {
  abstract findById(id: string): Promise<Question | null>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
  abstract save(question: Question): Promise<void>
  abstract create(question: Question): Promise<void>
  abstract delete(question: Question): Promise<void>
}