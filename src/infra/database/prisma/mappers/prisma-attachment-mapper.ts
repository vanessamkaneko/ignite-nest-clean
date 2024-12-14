/* Mapper -> são classes responsáveis por converter uma entidade com o formato da camada de domínio no formato da camada
de persistência (BD) ou vice-versa ->  no nosso caso em específico isso é necessário pq os tipos de valores do BD são
diferentes do domínio */

import { Attachment } from '@/domain/forum/enterprise/entities/attachment.entity';
import { Prisma } from '@prisma/client'

export class PrismaAttachmentMapper {

  static toPrisma(attachment: Attachment): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}
