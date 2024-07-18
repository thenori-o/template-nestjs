import { InvalidUuidError } from "../../errors/invalid-uuid.error";
import { UniqueEntityId } from "../unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
};

describe('UniqueEntityId Unit tests', () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId('fake')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a UUID passed in the constructor', () => {
    const validateSpy = spyValidateMethod();
    const uuid = '62645b45-52cd-4f7d-a516-917e15a4e2d1';
    const vo = new UniqueEntityId(uuid);

    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should generate a valid UUID', () => {
    const validateSpy = spyValidateMethod();
    const vo = new UniqueEntityId();

    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});