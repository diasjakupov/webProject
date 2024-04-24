import {Post} from "./post";
import {User} from "./user";

export interface Comment {
  id: number,
  author: string;
  author_id: number
  post: number
  content: string;
  createdDate: Date;
  updated: Date | null ;
}
