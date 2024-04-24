import {Post} from "./post";
import {User} from "./user";

export interface Like {
  author: User;
  post: Post;
}
