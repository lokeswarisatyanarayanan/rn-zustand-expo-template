import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { StateCreator } from "zustand/vanilla";

const shouldEnableDevtools = __DEV__;

export function createStore<T>(
  initializer: StateCreator<T, [["zustand/immer", never]], [], T>,
  storeName: string
): ReturnType<typeof create<T, [["zustand/immer", never]]>> {
  const immerWrapped = immer(initializer);

  if (shouldEnableDevtools) {
    return create(devtools(immerWrapped, { name: storeName }));
  }

  return create(immerWrapped);
}
