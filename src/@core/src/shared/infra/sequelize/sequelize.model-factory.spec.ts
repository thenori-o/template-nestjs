import { Column, DataType, Model, PrimaryKey, Sequelize, Table } from "sequelize-typescript";
import { SequelizeModelFactory } from "./sequelize.model-factory";
import _chance from "chance";
import { validate as uuidValidate } from "uuid";
import { setupSequelize } from "../testing/helpers/db";

const chance: Chance.Chance = _chance();
@Table({})
class StubModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name;

  static mockFactory = jest.fn(() => ({
    id: chance.guid({ version: 4}),
    name: chance.word(),
  }))

  static factory() {
    return new SequelizeModelFactory<StubModel, { id: string, name: string }>(StubModel, StubModel.mockFactory);
  }
}

describe("SequelizeModelFactory Unit test", () => {
  setupSequelize({ models: [StubModel] });

  test("create method", async () => {
    let model = await StubModel.factory().create();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.id).not.toBeNull();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalled();

    let foundModel = await StubModel.findByPk(model.id);
    expect(model.id).toBe(foundModel.id);

    model = await StubModel.factory().create({
      id: '62645b45-52cd-4f7d-a516-917e15a4e2d1',
      name: 'test'
    });
    expect(model.id).toBe('62645b45-52cd-4f7d-a516-917e15a4e2d1');
    expect(model.name).toBe('test');
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
    foundModel = await StubModel.findByPk(model.id);
    expect(model.id).toBe(foundModel.id);
  });

  test("make method", async () => {
    let model = StubModel.factory().make();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.id).not.toBeNull();
    expect(model.name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalled();
    
    model = StubModel.factory().make({
      id: '62645b45-52cd-4f7d-a516-917e15a4e2d1',
      name: 'test'
    });
    expect(model.id).toBe('62645b45-52cd-4f7d-a516-917e15a4e2d1');
    expect(model.name).toBe('test');
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
  });

  test('bulkCreate method using count = 1', async () => {
    let models = await StubModel.factory().bulkCreate();
    expect(models).toHaveLength(1);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalled();

    let foundModel = await StubModel.findByPk(models[0].id);
    expect(models[0].id).toBe(foundModel.id);
    expect(models[0].name).toBe(foundModel.name);

    models = await StubModel.factory().bulkCreate(() => ({
      id: '62645b45-52cd-4f7d-a516-917e15a4e2d1',
      name: 'test'
    }));
    expect(models[0].id).toBe('62645b45-52cd-4f7d-a516-917e15a4e2d1');
    expect(models[0].name).toBe('test');

    foundModel = await StubModel.findByPk(models[0].id);
    expect(models[0].id).toBe(foundModel.id);
    expect(models[0].name).toBe(foundModel.name);
  });

  test('bulkCreate method using count > 1', async () => {
    let models = await StubModel.factory().count(2).bulkCreate();
    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(models[1].id).not.toBeNull();
    expect(models[1].name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);

    let foundModel1 = await StubModel.findByPk(models[0].id);
    expect(models[0].id).toBe(foundModel1.id);
    expect(models[0].name).toBe(foundModel1.name);

    let foundModel2 = await StubModel.findByPk(models[1].id);
    expect(models[1].id).toBe(foundModel2.id);
    expect(models[1].name).toBe(foundModel2.name);

    models = await StubModel.factory().count(2).bulkCreate(() => ({
      id: chance.guid({version: 4}),
      name: 'test'
    }));
    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBe(models[1].id);
    expect(models[0].name).toBe('test');
    expect(models[1].name).toBe('test');
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
  });

  test('bulkMake method using count = 1', async () => {
    let models = StubModel.factory().bulkMake();
    expect(models).toHaveLength(1);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalled();

    models = StubModel.factory().bulkMake(() => ({
      id: '62645b45-52cd-4f7d-a516-917e15a4e2d1',
      name: 'test'
    }));
    expect(models[0].id).toBe('62645b45-52cd-4f7d-a516-917e15a4e2d1');
    expect(models[0].name).toBe('test');
  });

  test('bulkMake method using count > 1', async () => {
    let models = await StubModel.factory().count(2).bulkMake();
    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBeNull();
    expect(models[0].name).not.toBeNull();
    expect(models[1].id).not.toBeNull();
    expect(models[1].name).not.toBeNull();
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);

    models = await StubModel.factory().count(2).bulkMake(() => ({
      id: chance.guid({version: 4}),
      name: 'test'
    }));

    expect(models).toHaveLength(2);
    expect(models[0].id).not.toBe(models[1].id);
    expect(models[0].name).toBe('test');
    expect(models[1].name).toBe('test');
    expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
  });
});
