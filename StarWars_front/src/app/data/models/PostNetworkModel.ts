import { AuthorNetworkModel } from "./AuthorNetworkModel";

  
export interface PostNetworkModel {
    id: number;
    author: AuthorNetworkModel;
    created_date: string;
    updated_date: string;
    title: string;
    like_count: number;
    comment_count: number;
    content: string;
}