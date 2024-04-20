import {Post} from "./post";
import {User} from "./user";

export interface Comment {
  author: string; //User;
  post: string//Post;
  content: string;
  createdDate: Date;
  updated: Date | null ;
}
