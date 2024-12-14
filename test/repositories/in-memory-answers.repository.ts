import { DomainEvents } from "../../src/core/events/domain-events";
import { PaginationParams } from "../../src/core/repositories/pagination-params";
import { IAnswerAttachmentsRepository } from "../../src/domain/forum/application/repositories/IAnswerAttachments.repository";
import { IAnswersRepository } from "../../src/domain/forum/application/repositories/IAnswers.repository"
import { Answer } from "../../src/domain/forum/enterprise/entities/answer.entity"

export class InMemoryAnswersRepository implements IAnswersRepository {
  public items: Answer[] = []

  constructor(
    private answerAttachmentsRepository: IAnswerAttachmentsRepository
  ) {}

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

      return answers
  }

  async create(answer: Answer) {
    this.items.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }

}