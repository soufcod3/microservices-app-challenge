export interface CommentResponse {
    id: string;
    content: string;
    status: 'approved' | 'rejected' | 'pending';
}

export interface PostWithCommentsResponse {
    id: string;
    title: string;
    comments: CommentResponse[];
}