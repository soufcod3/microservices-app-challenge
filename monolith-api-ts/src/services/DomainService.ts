import {OrmRepository} from "./ORM/OrmRepository";
import {OrmPost} from "./ORM/Entity/OrmPost";
import {injectable, singleton} from "tsyringe";
import {v4 as uuid} from "uuid";
import {Comment} from "./ORM/Entity/OrmComment";
import {Moderator} from "./Moderator";

@injectable()
@singleton()
export class DomainService {
    constructor(private readonly ormRepository: OrmRepository) {}

    async createPost(title: string): Promise<void> {
        const post = new OrmPost(uuid(), title);
        await this.ormRepository.create<OrmPost>(post);
    }

    async createComment(postUuid: string, content: string): Promise<void> {
        const post: OrmPost|null = await this.ormRepository.findOne<OrmPost>(OrmPost, {uuid: postUuid});

        if (!post) {
            throw new Error('Post not found');
        }

        const comment = new Comment(
            uuid(),
            post.uuid,
            content,
            Moderator.moderate(content)
        );

        await this.ormRepository.create<Comment>(comment);
    }

    async getPostWithComments(uuid: string): Promise<OrmPost & {comments: Comment[]}> {
        const post: OrmPost|null = await this.ormRepository.findOne<OrmPost>(OrmPost, {uuid: uuid});

        if (!post) {
            throw new Error('Post not found');
        }

        const comments: Comment[] = await this.ormRepository.find<Comment>(Comment, {postUuid: post.uuid});

        return {
            uuid: post.uuid,
            title: post.title,
            comments: comments.map((comment) => {
                return new Comment(comment.uuid, comment.postUuid, comment.content, comment.status)
            })
        }
    }

    async getPosts(): Promise<any> {
        const posts = await this.ormRepository.find<OrmPost>(OrmPost, {});

        const comments = await this.ormRepository.find<Comment>(Comment, {});

        return  posts.map((post) => {
            return {
                uuid: post.uuid,
                title: post.title,
                comments: comments.filter((comment) => comment.postUuid === post.uuid).map((comment) => comment)
            }
        });
    }
}