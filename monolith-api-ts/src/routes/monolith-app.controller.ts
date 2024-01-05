import {Body, Get, Path, Post, Route} from "tsoa";
import {DomainService} from "../services/DomainService";
import {Controller} from "@tsoa/runtime";
import {injectable} from "tsyringe";
import {CommentResponse, PostWithCommentsResponse} from "../dto/response";
import {Comment} from "../services/ORM/Entity/OrmComment";

@injectable()
@Route('')
export class MonolithAppController extends Controller
{
    constructor(private readonly service: DomainService) {
        super();
    }

    @Get()
    public async testApi(): Promise<any>
    {
        return 'Hello';
    }

    @Post('/posts')
    async createPost(@Body() body: { title: string }) {
        await this.service.createPost(body.title);
    }

    @Post("/posts/{uuid}/comments")
    public async createComment(@Path() uuid: string, @Body() body: { content: string }): Promise<any>
    {
        await this.service.createComment(uuid, body.content);
    }

    @Get('{uuid}/with-comments')
    async getPostWithComments(@Path() uuid: string) {
        const post = await this.service.getPostWithComments(uuid);
        const comments = post.comments.map((comment: Comment) => {
            return {
                uuid: comment.uuid,
                content: comment.content,
                status: comment.status,
            } as unknown as CommentResponse;
        });

        return {
            uuid: post.uuid,
            title: post.title,
            comments: comments
        } as unknown as PostWithCommentsResponse;
    }

    @Get('/posts')
    async getPosts() {
        const posts = await this.service.getPosts();
        return posts.map((post: any) => {
            const comments = post.comments.map((comment: Comment) => {
                return {
                    id: comment.uuid,
                    content: comment.content,
                    status: comment.status,
                } as unknown as CommentResponse;
            });

            return {
                id: post.uuid,
                title: post.title,
                comments: comments
            } as unknown as PostWithCommentsResponse;
        });
    }
}