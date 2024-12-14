import { faker } from '@faker-js/faker'
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

import { Slug } from "../../src/domain/forum/enterprise/entities/value-objects/slug";
import { Notification, NotificationProps } from '../../src/domain/notification/enterprise/entities/notification.entity';

export function makeNotification(override: Partial<NotificationProps> = {}, id?: UniqueEntityID) {
  const notification = Notification.create({
    recipientId: new UniqueEntityID(),
    title: faker.lorem.sentence(4),
    content: faker.lorem.sentence(10),
    ...override
  }, id)

  return notification
}