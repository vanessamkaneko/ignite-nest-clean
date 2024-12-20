/* Mapper -> são classes responsáveis por converter o formato de uma entidade de camada de domínio no formato de uma entidade de
camada de persistência (BD) ou vice-versa -> no nosso caso em específico isso é necessário pq os tipos de valores do BD são 
diferentes do domínio */

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Notification } from '@/domain/notification/enterprise/entities/notification.entity';
import { Notification as PrismaNotification, Prisma } from '@prisma/client'

export class PrismaNotificationMapper {
  // Converte uma Notification do Prisma (representação da tabela do BD) em uma Notification do Domain (entidade de domínio)
  static toDomain(raw: PrismaNotification): Notification {
    // criando referência p/ uma notification já existente
    return Notification.create(
      {
        title: raw.title,
        content: raw.content,
        recipientId: new UniqueEntityID(raw.recipientId),
        readAt: raw.readAt,
        createdAt: raw.createdAt,
      }, 
      new UniqueEntityID(raw.id)
    )
  }

  // Converte uma Notification do domínio em uma Notification do Prisma
  static toPrisma(notification: Notification): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id.toString(), 
      recipientId: notification.recipientId.toString(), 
      title: notification.title, 
      content: notification.content, 
      readAt: notification.readAt,
      createdAt: notification.createdAt, 
    }
  }
}

// undefined -> valor inexistente/indefinido | null -> valor vazio/não preenchido