import {User} from "./user";
export interface Post {
  id : number;
  author:string;
  title: string;
  content: string;
  createdDate: Date;
  likes: number//Like;
  comments: number//Comment
  updated: Date | null ;
}
