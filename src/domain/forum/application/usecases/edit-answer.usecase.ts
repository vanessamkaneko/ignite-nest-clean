import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id"
import { NotAllowedError } from "../../../../core/errors/not-allowed-error"
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list"
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment.entity"
import { Answer } from "../../enterprise/entities/answer.entity"
import { IAnswerAttachmentsRepository } from "../repositories/IAnswerAttachments.repository"
import { IAnswersRepository } from "../repositories/IAnswers.repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answer: Answer }>

@Injectable()
export class EditAnswerUseCase {
  constructor(
    private answersRepository: IAnswersRepository,
    private answerAttachmentsRepository: IAnswerAttachmentsRepository,
  ) { }

  async execute({ authorId, answerId, content, attachmentsIds }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    // buscando os anexos da resposta
    const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    // criando lista de anexos da resposta
    const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments)

    // criando anexos individualmente (ver no teste p/ melhor entendimento)
    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id
      })
    })

    // atualizando lista de anexos
    answerAttachmentList.update(answerAttachments)

    answer.attachments = answerAttachmentList //attachments com lista de valores atualizada

    answer.content = content

    await this.answersRepository.save(answer)

    return right({
      answer
    })
  }
}