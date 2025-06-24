import { getItem } from "@src/library/storage";
import type { AppState } from "./createSlices";

type SetFn = (fn: (state: AppState) => void) => void;

export async function hydrateAppStateSlice(set: SetFn): Promise<void> {
  const isOnboardingCompleted = await getItem<string>("ONBOARDING_COMPLETED");

  set((state) => {
    state.app.isOnboardingCompleted = isOnboardingCompleted === "true";
  });
}
