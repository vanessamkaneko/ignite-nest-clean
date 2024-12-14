import { Attachment } from "../../enterprise/entities/attachment.entity";

export abstract class IAttachmentsRepository {
  abstract create(attachments: Attachment): Promise<void>
}