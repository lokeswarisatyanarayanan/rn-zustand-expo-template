import { createStore } from "@src/library/state";

import { createSlices, type AppState } from "./createSlices";

export const useAppStore = createStore<AppState>(
  (set, get, store) => createSlices(set, get, store),
  "AppStore"
);

export type AppStoreType = typeof useAppStore;
