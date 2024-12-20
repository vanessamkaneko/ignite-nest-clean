import { Injectable } from "@nestjs/common"
import { Either, right } from "../../../../core/either"
import { IAnswerCommentsRepository } from "../repositories/IAnswerComments.repository"
import { CommentWithAuthor } from "../../enterprise/entities/value-objects/comment-with-author"

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<null, {
  comments: CommentWithAuthor[]
}>

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(
    private answerCommentsRepository: IAnswerCommentsRepository,
  ) {}

  async execute({ page, answerId }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const comments = await this.answerCommentsRepository.findManyByAnswerIdWithAuthor(answerId, { page })

    return right({ comments }) 
  }
}