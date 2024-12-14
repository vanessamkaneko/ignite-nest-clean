import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { AnswerComment } from "../../enterprise/entities/answer-comment.entity"
import { IAnswerCommentsRepository } from "../repositories/IAnswerComments.repository"
import { IAnswersRepository } from "../repositories/IAnswers.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError,  { answerComment: AnswerComment }>

@Injectable()
export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerCommentsRepository: IAnswerCommentsRepository
  ) {}

  async execute({ authorId, answerId, content }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({
      answerComment
    })
  }
}