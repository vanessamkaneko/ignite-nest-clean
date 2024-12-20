import { Injectable } from "@nestjs/common"
import { Either, right } from "../../../../core/either"
import { IQuestionCommentsRepository } from "../repositories/IQuestionComments.repository"
import { CommentWithAuthor } from "../../enterprise/entities/value-objects/comment-with-author"

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<null, {
  comments: CommentWithAuthor[]
}>

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({ page, questionId }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const comments = await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(questionId, { page })

    return right({ comments })
  }
}