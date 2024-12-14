import { error } from "console"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { Question } from "../../enterprise/entities/question.entity"
import { IQuestionsRepository } from "../repositories/IQuestions.repository"
import { Either, left, right } from "../../../../core/either"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { Injectable } from "@nestjs/common"


interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, {
  question: Question
}>

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
  ) {}

  async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw left(new ResourceNotFoundError())
    }

    return right ({ question })
  }
}