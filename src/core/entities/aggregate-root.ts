import { DomainEvent } from "../events/domain-event";
import { DomainEvents } from "../events/domain-events";
import { Entity } from "./entity";

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = []

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  /* método para pré-disparo dos eventos: resposta criada -> registra que o evento existe, ficando pendente p/ envio */
  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent) // registrando evento
    DomainEvents.markAggregateForDispatch(this) 
    /* this -> se refere a instância da classe que chama o método addDomainEvent... No caso do domain-events.spec.ts,
    o this irá se referir a instância de CustomAggregate */
  }

  public clearEvents() {
    this._domainEvents = []
  }
}