import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";

export interface CommentProps {
  authorId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date | null 
}

/* abstract class -> não pode ser instanciada diretamente (ex: new Comment()) | 
QuestionComment.create() -> new QuestionComment() ... -> só pode ser instanciada as classes que herdam ela (que é o
caso da QuestionComment)... */

export abstract class Comment<Prop extends CommentProps> extends Entity<Prop> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
}