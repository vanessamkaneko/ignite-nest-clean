/* Mapper -> são classes responsáveis por converter o formato de uma entidade de camada de domínio no formato de uma entidade de
camada de persistência (BD) ou vice-versa -> no nosso caso em específico isso é necessário pq os tipos de valores do BD são 
diferentes do domínio */

import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question.entity';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';
import { Question as PrismaQuestion, Prisma } from '@prisma/client'

export class PrismaQuestionMapper {
  // Converte uma Question do Prisma (representação da tabela do BD) em uma Question do Domain (entidade de domínio)
  static toDomain(raw: PrismaQuestion): Question {
    // criando referência p/ uma question já existente
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        bestAnswerId: raw.bestAnswerId ? new UniqueEntityID(raw.bestAnswerId) : null,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      }, 
      new UniqueEntityID(raw.id)
    )
  }

  // Converte uma Question do domínio em uma Question do Prisma
  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toString(), 
      authorId: question.authorId.toString(), 
      bestAnswerId: question.bestAnswerId?.toString(), 
      title: question.title, 
      content: question.content, 
      slug: question.slug.value, 
      createdAt: question.createdAt, 
      updatedAt: question.updatedAt 
    }
  }
}

// undefined -> valor inexistente/indefinido | null -> valor vazio/não preenchido