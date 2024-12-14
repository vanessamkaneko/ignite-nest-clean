import { UseCaseError } from "@/core/errors/usecase-error";

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super("Credentials are not valid.")
  }
}