import { InvalidUuidError } from "../errors/invalid-uuid.error";
import { v4 as UUIDv4, validate as uuidValidate } from "uuid";
import { ValueObject } from "./value-object";

export class UniqueEntityId extends ValueObject<string> {

  constructor(readonly id?: string) {
    super(id || UUIDv4());
    this.validate();
  }

  private validate() {
    const uuid = uuidValidate(this.value);

    if (!uuid) throw new InvalidUuidError();
  }
}