import { AuthorNetworkModel } from "./AuthorNetworkModel";

export interface CommentNetworkModel{
    author: AuthorNetworkModel,
    id: number,
    created_date: string;
    updated_date: string;
    content: string,
    post: number
}