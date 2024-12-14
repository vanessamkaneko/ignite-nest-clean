import { DomainEvents } from "../../../../core/events/domain-events";
import { EventHandler } from "../../../../core/events/event-handler";
import { IQuestionsRepository } from "../../../forum/application/repositories/IQuestions.repository";
import { AnswerCreatedEvent } from "../../../forum/enterprise/events/answer-created-event";
import { SendNotificationUseCase } from "../usecases/send-notification";

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: IQuestionsRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name)
  }

  // função chamada pelo handler da função dispatch do domain-events
  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em "${question.title.substring(0, 40).concat('...')}"`,
        content: answer.excerpt,
      })
    }
  }
}

/* bind -> é p/ dizer que sempre que a função sendNewAnswerNotification for chamada, dentro dela o this tem que se referir 
à classe OnAnswerCreated */