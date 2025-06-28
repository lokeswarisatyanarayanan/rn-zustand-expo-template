import type { AppState } from './createSlices';
import { hydrateAppStateSlice } from './hydrateAppState';

type SetFn = (fn: (state: AppState) => void) => void;

/**
 * Add all your slice-level hydrators here.
 */

const sliceHydrators = [hydrateAppStateSlice];

/**
 * Hydrate the full store from storage using all slice hydrators.
 */

export async function hydrateStoreFromSecureStorage(set: SetFn): Promise<void> {
  await Promise.all(sliceHydrators.map(h => h(set)));
}
