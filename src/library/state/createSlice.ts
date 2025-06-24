import type { StateCreator } from "zustand/vanilla";

/**
 * Reusable slice creator with immer + global store access.
 * T is the slice state
 * S is the full store state
 */
export type CreateSlice<T, S = T> = StateCreator<
  S,
  [["zustand/immer", never]],
  [],
  T
>;
