import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either"
import { NotAllowedError } from "../../../../core/errors/not-allowed-error"
import { IAnswersRepository } from "../repositories/IAnswers.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"


interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>

@Injectable()
export class DeleteAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
  ) {}

  async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answer)

    return right(null)
  }
}