import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { NotAllowedError } from "../../../../core/errors/not-allowed-error"
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list"
import { QuestionAttachment } from "../../enterprise/entities/question-attachment.entity"
import { Question } from "../../enterprise/entities/question.entity"
import { IQuestionAttachmentsRepository } from "../repositories/IQuestionAttachments.repository"
import { IQuestionsRepository } from "../repositories/IQuestions.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>

@Injectable()
export class EditQuestionUseCase {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private questionAttachmentsRepository: IQuestionAttachmentsRepository
  ) {}

  async execute({ authorId, questionId, title, content, attachmentsIds }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    // buscando os anexos da questão
    const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    // criando lista de anexos da questão
    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

    // criando anexos individualmente (ver no teste p/ melhor entendimento)
    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id
      })
    })

    // atualizando lista de anexos
    questionAttachmentList.update(questionAttachments)

    question.attachments = questionAttachmentList //attachments com lista de valores atualizada
    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return right ({
      question
    })
  }
}