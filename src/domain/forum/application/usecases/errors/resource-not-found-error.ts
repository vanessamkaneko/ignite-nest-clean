import { UseCaseError } from "../../../../../core/errors/usecase-error";

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found!')
  }
}