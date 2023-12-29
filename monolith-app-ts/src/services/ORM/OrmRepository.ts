import {Datasource} from "./Datasource";
import {EntityManager, EntityTarget, ObjectLiteral} from "typeorm";
import {singleton} from "tsyringe";

@singleton()
export class OrmRepository {
    private readonly manager: EntityManager = Datasource.manager;

    public async create<E extends ObjectLiteral>(data: E): Promise<void> {
        await this.manager.save(data);
    }

    public async findOne<E extends ObjectLiteral>(entity: EntityTarget<E>, where: Partial<E>): Promise<E|null> {
        return await this.manager.findOneBy(entity, where);
    }

    public async find<E extends ObjectLiteral>(entity: EntityTarget<E>, where: Partial<E>): Promise<E[]> {
        return await this.manager.find(entity);
    }
}