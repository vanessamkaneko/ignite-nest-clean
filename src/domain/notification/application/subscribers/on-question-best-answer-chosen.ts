import { DomainEvents } from "../../../../core/events/domain-events";
import { EventHandler } from "../../../../core/events/event-handler";
import { IAnswersRepository } from "../../../forum/application/repositories/IAnswers.repository";
import { AnswerCreatedEvent } from "../../../forum/enterprise/events/answer-created-event";
import { QuestionBestAnswerChosenEvent } from "../../../forum/enterprise/events/question-best-answer-chosen-event";
import { SendNotificationUseCase } from "../usecases/send-notification";

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: IAnswersRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name)
  }

  // função chamada pelo handler da função dispatch do domain-events
  private async sendQuestionBestAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(bestAnswerId.toString())

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: 'Sua resposta foi escolhida!',
        content: `A resposta que você enviou em "${question.title
          .substring(0, 20)
          .concat('...')
        }" foi escolhida pelo autor!`,
      })
    }
  }
}
