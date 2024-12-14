/* Mapper -> são classes responsáveis por converter o formato de uma entidade de camada de domínio no formato de uma entidade de
camada de persistência (BD) ou vice-versa -> no nosso caso em específico isso é necessário pq os tipos de valores do BD são 
diferentes do domínio */

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer.entity';
import { Answer as PrismaAnswer, Prisma } from '@prisma/client'

export class PrismaAnswerMapper {
  // Converte uma Answer do Prisma (representação da tabela do BD) em uma Answer do Domain (entidade de domínio)
  static toDomain(raw: PrismaAnswer): Answer {
    // criando referência p/ uma answer já existente
    return Answer.create(
      {
        content: raw.content,
        questionId: new UniqueEntityID(raw.questionId),
        authorId: new UniqueEntityID(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      }, 
      new UniqueEntityID(raw.id)
    )
  }

  // Converte uma Answer do domínio em uma Answer do Prisma
  static toPrisma(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      content: answer.content, 
      questionId: answer.questionId.toString(),
      authorId: answer.authorId.toString(), 
      createdAt: answer.createdAt, 
      updatedAt: answer.updatedAt,
      id: answer.id.toString(),
    }
  }
}

// undefined -> valor inexistente/indefinido | null -> valor vazio/não preenchido