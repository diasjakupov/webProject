interface AuthorNetworkModel {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }
  
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