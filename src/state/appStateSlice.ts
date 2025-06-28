import { CreateSlice } from '@src/library/state';

import { AppState } from './createSlices';

export interface AppStateSlice {
  isOnboardingCompleted: boolean;
  setOnboardingCompleted: (val: boolean) => void;
}

export const createAppStateSlice: CreateSlice<AppStateSlice, AppState> = set => ({
  isOnboardingCompleted: false,

  setOnboardingCompleted: val =>
    set(state => {
      state.app.isOnboardingCompleted = val;
    }),
});
