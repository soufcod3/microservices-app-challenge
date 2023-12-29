import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Comment {
    @PrimaryColumn()
    readonly uuid: string;

    @Column()
    readonly postUuid: string;

    @Column()
    readonly content: string;

    @Column()
    readonly status: string;

    constructor(uuid: string, postUuid: string, content: string, status: string) {
        this.uuid = uuid;
        this.postUuid = postUuid;
        this.content = content;
        this.status = status;
    }
}