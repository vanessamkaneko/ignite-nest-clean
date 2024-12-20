import { Notification } from "../../enterprise/entities/notification.entity";

export abstract class INotificationsRepository {
  abstract findById(id: string): Promise<Notification | null>
  abstract create(notification: Notification): Promise<void>
  abstract save(notification: Notification): Promise<void>
}