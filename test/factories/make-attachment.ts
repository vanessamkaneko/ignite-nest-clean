import { faker } from '@faker-js/faker'
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";
import { Attachment, AttachmentProps } from '@/domain/forum/enterprise/entities/attachment.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaAttachmentMapper } from '@/infra/database/prisma/mappers/prisma-attachment-mapper';

/* O override é um objeto com propriedades opcionais de AttachmentProps (Partial<AttachmentProps>); sobrescreve os valores gerados 
automaticamente pelo faker com os valores fornecidos pelo usuário, se houver; caso nenhum valor seja fornecido, todos
serão gerados pelo faker */

export function makeAttachment(override: Partial<AttachmentProps> = {}, id?: UniqueEntityID) {
  const attachment = Attachment.create(
    {
      title: faker.lorem.slug(),
      url: faker.lorem.slug(),
      ...override
    }, id)

  return attachment
}

// Para utilizar factories nos testes E2E
@Injectable()
export class AttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAttachment(data: Partial<AttachmentProps> = {}): Promise<Attachment> {
    const attachment = makeAttachment(data)

    await this.prisma.attachment.create({
      data: PrismaAttachmentMapper.toPrisma(attachment)
    })

    return attachment
  }
}