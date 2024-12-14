import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { QuestionComment } from "../../enterprise/entities/question-comment.entity"
import { IQuestionCommentsRepository } from "../repositories/IQuestionComments.repository"
import { IQuestionsRepository } from "../repositories/IQuestions.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, { questionComment: QuestionComment }>

@Injectable()
export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionCommentsRepository: IQuestionCommentsRepository
  ) {}

  async execute({ authorId, questionId, content }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
    return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content
    })

    await this.questionCommentsRepository.create(questionComment)

    return right ({
      questionComment
    })
  }
}