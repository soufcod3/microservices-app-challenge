import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
class Post {
    @PrimaryColumn()
    readonly uuid: string;

    @Column()
    readonly title: string;

    constructor(uuid: string, title: string) {
        this.uuid = uuid;
        this.title = title;
    }
}

export {Post as OrmPost};