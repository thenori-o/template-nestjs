import { Entity } from "../../entity/entity";
import { NotFoundError } from "../../errors/not-found.error";
import { UniqueEntityId } from "../../value-objects/unique-entity-id.vo";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => (repository = new StubInMemoryRepository()));

  it("should insert a new entity", async () => {
    const entity = new StubEntity({ name: "name", price: 100 });
    await repository.insert(entity);

    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throw an error when entity\'s not found", async () => {
    await expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError(`Entity not found using id 'fake id'`)
    );

    await expect(
      repository.findById(
        new UniqueEntityId("62645b45-52cd-4f7d-a516-917e15a4e2d1")
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity not found using id '62645b45-52cd-4f7d-a516-917e15a4e2d1'`
      )
    );
  });

  it('should find entity by id', async () => {
    const entity = new StubEntity({ name: "name", price: 100 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it('should find all entities', async () => {
    const entity = new StubEntity({ name: "name", price: 100 });
    await repository.insert(entity);

    const entities = await repository.findAll();
    expect(entities).toStrictEqual([entity]);
  });

  it("should throw an error on update when entity\'s not found", () => {
    const entity = new StubEntity({ name: "name", price: 100 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found using id '${entity.id}'`)
    );
  });

  it('should update an entity', async () => {
    const entity = new StubEntity({ name: "name", price: 100 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      { name: "updated", price: 1 }, 
      entity.uniqueEntityId
    );

    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throw an error on delete when entity\'s not found", () => {
    expect(repository.delete("fake id")).rejects.toThrow(
      new NotFoundError(`Entity not found using id 'fake id'`)
    );

    expect(
      repository.delete(
        new UniqueEntityId("62645b45-52cd-4f7d-a516-917e15a4e2d1")
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity not found using id '62645b45-52cd-4f7d-a516-917e15a4e2d1'`
      )
    );
  });

  it('should delete an entity', async () => {
    const entity = new StubEntity({ name: "name", price: 100 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);

    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  });
});
