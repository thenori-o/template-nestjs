import { FieldsErrors } from "../validators";

export class LoadEntityError extends Error {
  constructor(
    public error: FieldsErrors,
    message?: string
  ) {
    super(message ?? "Load Entity Error");
    this.name = "LoadEntityError";
  }
}
