import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.entity';
import { Comment as PrismaComment, Prisma } from '@prisma/client'

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaComment): AnswerComment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type.')
    }

    return AnswerComment.create(
      {
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        authorId: new UniqueEntityID(raw.authorId),
        answerId: new UniqueEntityID(raw.answerId)
      }, 
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(answerComment: AnswerComment): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      content: answerComment.content, 
      createdAt: answerComment.createdAt, 
      updatedAt: answerComment.updatedAt,
      authorId: answerComment.authorId.toString(), 
      answerId: answerComment.answerId.toString(),
    }
  }
}
