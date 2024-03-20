import create from "./http-service";

export interface Post {
  id: number;
  title: string;
  userId: number;
}

export default create<Post>("/posts");
