import { Injectable } from "@nestjs/common"
import { Either, right } from "../../../../core/either"
import { Answer } from "../../enterprise/entities/answer.entity"
import { IAnswersRepository } from "../repositories/IAnswers.repository"

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<null, {
  answers: Answer[]
}>

@Injectable()
export class FetchQuestionAnswersUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
  ) {}

  async execute({ page, questionId }: FetchQuestionAnswersUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })

    return right ({ answers })
  }
}