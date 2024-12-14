import { Notification } from "../../enterprise/entities/notification.entity";

export interface INotificationsRepository {
  findById(id: string): Promise<Notification | null>
  create(notification: Notification): Promise<void>
  save(notification: Notification): Promise<void>
}