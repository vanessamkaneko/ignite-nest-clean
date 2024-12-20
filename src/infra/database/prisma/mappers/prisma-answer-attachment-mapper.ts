import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment.entity';
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment): AnswerAttachment {
    if (!raw.answerId) {
      throw new Error('Invalid attachment type.')
    }

    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        answerId: new UniqueEntityID(raw.answerId)
      }, 
      new UniqueEntityID(raw.id)
    )
  }

     // ao criar vários question attachments, o que deve ser feito é a atualização dos attachments com a id da question referente
    static toPrismaUpdateMany(attachments: AnswerAttachment[]): Prisma.AttachmentUpdateManyArgs {
      const attachmentIds = attachments.map((attachment) => {
        return attachment.attachmentId.toString()
      })
  
      return {
        where: {
          id: {
            in: attachmentIds,
          },
        },
        data: {
          answerId: attachments[0].answerId.toString()
        }
      }
    }
}
