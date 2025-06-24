import { useAppStore } from "@src/state";
import type { Post } from "../data";

export type UsePostReturn = {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  fetchPostById: (id: string) => Promise<void>;
  selectedPost: Post | null;
  clearError: () => void;
};

export const usePost = (): UsePostReturn => {
  const posts = useAppStore((state) => state.post.posts);
  const isLoading = useAppStore((state) => state.post.isLoading);
  const selectedPost = useAppStore(state => state.post.selectedPost);
  const error = useAppStore((state) => state.post.error);
  const fetchPosts = useAppStore((state) => state.post.fetchPosts);
  const fetchPostById = useAppStore(state => state.post.fetchPostById);
  const clearError = useAppStore((state) => state.post.clearError);

  return {
    posts,
    selectedPost,
    isLoading,
    error,
    fetchPosts,
    fetchPostById,
    clearError,
  };
};
