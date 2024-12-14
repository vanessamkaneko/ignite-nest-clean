import { Either, left, right } from "../../../../core/either"
import { NotAllowedError } from "../../../../core/errors/not-allowed-error"
import { ResourceNotFoundError } from "../../../forum/application/usecases/errors/resource-not-found-error"
import { Notification } from "../../enterprise/entities/notification.entity"
import { INotificationsRepository } from "../repositories/INotifications.repository"

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { notification: Notification }>

export class ReadNotificationUseCase {
  constructor(
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute({ recipientId, notificationId }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if(recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return right ({ notification })
  }
}