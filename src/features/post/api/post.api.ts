import { request } from "@src/library/api";
import { Post } from "../data";

export const fetchPosts = async (): Promise<Post[]> => {
  return request("/posts", {});
};

export const fetchPostById = async (id: string): Promise<Post> => {
  return request(`/posts/${id}`, {});
};
