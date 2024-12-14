import { Injectable } from "@nestjs/common"
import { Either, right } from "../../../../core/either"
import { QuestionComment } from "../../enterprise/entities/question-comment.entity"
import { IQuestionCommentsRepository } from "../repositories/IQuestionComments.repository"

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<null, {
  questionComments: QuestionComment[]
}>

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(
    private questionCommentsRepository: IQuestionCommentsRepository,
  ) {}

  async execute({ page, questionId }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page })

    return right({ questionComments })
  }
}