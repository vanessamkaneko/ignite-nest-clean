import { INotificationsRepository } from "../../src/domain/notification/application/repositories/INotifications.repository"
import { Notification } from "../../src/domain/notification/enterprise/entities/notification.entity"

export class InMemoryNotificationsRepository implements INotificationsRepository {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }

  async findById(id: string) {
    const notification = this.items.find((item) => item.id.toString() === id);

    if (!notification) {
      return null
    }

    return notification
  }

  async save(notification: Notification) {
    const itemIndex = this.items.findIndex((item) => item.id === notification.id)

    this.items[itemIndex] = notification
  }

}