import { IQuestionsRepository } from "../repositories/IQuestions.repository"
import { Either, left, right } from "../../../../core/either"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { Injectable } from "@nestjs/common"
import { QuestionDetails } from "../../enterprise/entities/value-objects/question-details"


interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, {
  question: QuestionDetails
}>

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
  ) {}

  async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findDetailsBySlug(slug)

    if (!question) {
      throw left(new ResourceNotFoundError())
    }

    return right ({ question })
  }
}