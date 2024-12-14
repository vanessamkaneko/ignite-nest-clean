import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either"
import { NotAllowedError } from "../../../../core/errors/not-allowed-error"
import { IQuestionsRepository } from "../repositories/IQuestions.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"


interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>

@Injectable()
export class DeleteQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
  ) {}

  async execute({ questionId, authorId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return right(null)
  }
}