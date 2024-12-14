import { IAttachmentsRepository } from "@/domain/forum/application/repositories/IAttachments-repository";
import { Attachment } from "@/domain/forum/enterprise/entities/attachment.entity";

export class InMemoryAttachmentsRepository implements IAttachmentsRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}