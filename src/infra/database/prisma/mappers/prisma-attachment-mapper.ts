/* Mapper -> são classes responsáveis por converter uma entidade com o formato da camada de domínio no formato da camada
de persistência (BD) ou vice-versa ->  no nosso caso em específico isso é necessário pq os tipos de valores do BD são
diferentes do domínio */

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment.entity';
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAttachmentMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create({
      title: raw.title,
      url: raw.url,
    }, new UniqueEntityID(raw.id))
  }

  static toPrisma(attachment: Attachment): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}


