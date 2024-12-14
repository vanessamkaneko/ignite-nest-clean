import { UniqueEntityID } from '../entities/unique-entity-id'

// Evento em si

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityID
}
