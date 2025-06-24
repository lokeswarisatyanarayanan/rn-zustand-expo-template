import type { StateCreator } from "zustand/vanilla";

export type ZustandMiddleware = [["zustand/immer", never]];

export type TypedStateCreator<T, R = T> = StateCreator<
  T,
  ZustandMiddleware,
  [],
  R
>;
