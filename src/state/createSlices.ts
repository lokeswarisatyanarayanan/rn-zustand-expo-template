import type { TypedStateCreator } from "@src/library/state/types";
import { createAppStateSlice, type AppStateSlice } from "./appStateSlice";
import { createPostSlice, PostSlice } from "@src/features/post/state/post.slice";

/**
 * AppState interface that includes all slices.
 */
export interface AppState {
  app: AppStateSlice;
  post: PostSlice;
  resetAppState: () => void;
}

/**
 * Combines all slices into the store.
 */

export const createSlices: TypedStateCreator<AppState, AppState> = (
  set,
  get,
  store
) => {
  return {
    app: createAppStateSlice(set, get, store),
    post: createPostSlice(set, get, store),
    resetAppState: () => {
      set(() => ({
        app: createAppStateSlice(set, get, store),
        post: createPostSlice(set, get, store),
      }));
    },
  };
};
