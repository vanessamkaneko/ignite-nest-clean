import { DomainEvents } from "../../src/core/events/domain-events";
import { PaginationParams } from "../../src/core/repositories/pagination-params";
import { IQuestionsRepository } from "../../src/domain/forum/application/repositories/IQuestions.repository";
import { Question } from "../../src/domain/forum/enterprise/entities/question.entity";
import { InMemoryQuestionAttachmentsRepository } from "./in-memory-question-attachments.repository";
import { InMemoryAttachmentsRepository } from "./in-memory-attachments.repository";
import { InMemoryStudentsRepository } from "./in-memory-students.repository";
import { QuestionDetails } from "@/domain/forum/enterprise/entities/value-objects/question-details";

export class InMemoryQuestionsRepository implements IQuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
    private studentsRepository: InMemoryStudentsRepository
  ) { }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null
    }

    return question
  }

  async findDetailsBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null
    }

    const author = this.studentsRepository.items.find((student) => {
      return student.id.equals(question.authorId)
    })

    if (!author) {
      throw new Error(
        `Author with ID "${question.authorId.toString()}" does not exist.`
      )
    }

    // lista de anexos da questão
    const questionAttachments = this.questionAttachmentsRepository.items.filter(
      (questionAttachment) => {
        return questionAttachment.questionId.equals(question.id)
      })

    // obtendo infos do anexo (title e url)
    const attachments = questionAttachments.map(questionAttachment => {
      const attachment = this.attachmentsRepository.items.find(attachment => {
        return attachment.id.equals(questionAttachment.attachmentId)
      })

      if (!attachment) {
        throw new Error(
          `Attachment with ID "${questionAttachment.attachmentId.toString()}" does not exist.`
        )
      }

      return attachment
    })

    return QuestionDetails.create({
      questionId: question.id,
      authorId: question.authorId,
      author: author.name,
      title: question.title,
      slug: question.slug,
      content: question.content,
      bestAnswerId: question.bestAnswerId,
      attachments,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt
    })
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // newest to oldest: the most recent items (those with the latest createdAt timestamp) will appear first.
      .slice((page - 1) * 20, page * 20)

    return questions
  }
  // ascendente: menor ---> maior ~ oldest to the newest | descendente: maior ---> menor ~ newest to the oldest***
  /* valor negativo se o "b" for mais antigo que o "a" (indicando que o "a" deve vir primeiro)
   valor positivo se o "b" for mais recente que o "a" (indicando que o "b" deve vir primeiro) */

  async create(question: Question) {
    this.items.push(question)

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getItems()
    )

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id);

    if (!question) {
      return null
    }

    return question
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)

    this.questionAttachmentsRepository.deleteManyByQuestionId(question.id.toString())
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIndex] = question

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getNewItems()
    )

    await this.questionAttachmentsRepository.deleteMany(
      question.attachments.getRemovedItems()
    )

    DomainEvents.dispatchEventsForAggregate(question.id)
  }
}