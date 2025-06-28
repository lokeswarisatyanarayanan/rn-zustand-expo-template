import { CreateSlice } from '@src/library/state';
import { AppState } from '@src/state/createSlices';

import { fetchPostById, fetchPosts } from '../api';
import type { Post } from '../data';

export interface PostSlice {
  posts: Post[];
  selectedPost: Post | null;
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  fetchPostById: (id: string) => Promise<void>;
  clearError: () => void;
}

export const createPostSlice: CreateSlice<PostSlice, AppState> = set => ({
  posts: [],
  selectedPost: null,
  isLoading: false,
  error: null,

  clearError: () => {
    set(state => {
      state.post.error = null;
    });
  },

  fetchPosts: async () => {
    set(state => {
      state.post.isLoading = true;
      state.post.error = null;
    });
    try {
      const posts = await fetchPosts();
      set(state => {
        state.post.error = null;
        state.post.posts = posts;
      });
    } catch {
      set(state => {
        state.post.error = '';
      });
    } finally {
      set(state => {
        state.post.isLoading = false;
        state.post.error = null;
      });
    }
  },

  fetchPostById: async (id: string) => {
    set(state => {
      state.post.isLoading = true;
      state.post.error = null;
    });
    try {
      const post = await fetchPostById(id);
      set(state => {
        state.post.error = null;
        state.post.selectedPost = post;
      });
    } catch {
      set(state => {
        state.post.error = '';
      });
    } finally {
      set(state => {
        state.post.isLoading = false;
      });
    }
  },
});
