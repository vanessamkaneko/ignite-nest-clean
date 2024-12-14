import { UseCaseError } from "@/core/errors/usecase-error";

export class InvalidAttachmentType extends Error implements UseCaseError {
  constructor(type: string) {
    super(`File type "${type}" is not valid.`)
  }
}