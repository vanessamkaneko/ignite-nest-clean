import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { Optional } from "../../../../core/types/optional";

export interface NotificationProps {
  recipientId: UniqueEntityID
  title: string
  content: string
  readAt?: Date
  createdAt: Date
}

export class Notification extends Entity<NotificationProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get readAt() {
    return this.props.readAt
  }

  get createdAt() {
    return this.props.createdAt
  }
  
  /* accessor -> método que permite modificar o valor de uma propriedade s/ dar acesso direto a ela.
   ex: "notification.read = xxx" atribuindo novo valor não é permitido*/
  read() {
    this.props.readAt = new Date()
  }

  static create(props: Optional<NotificationProps, 'createdAt'>, id?: UniqueEntityID) { // id p/ no caso de estar criando uma referência de uma notif. já existente
    const notification = new Notification(
      {
        ...props,
        createdAt: props.createdAt ?? new Date()
      }, 
      id,
    )

    return notification
  }
}