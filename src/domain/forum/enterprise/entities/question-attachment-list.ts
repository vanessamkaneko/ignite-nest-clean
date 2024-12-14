import { WatchedList } from "../../../../core/entities/watched-list";
import { QuestionAttachment } from "./question-attachment.entity";

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}