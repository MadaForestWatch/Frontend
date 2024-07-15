import { create } from 'zustand';

import { Profile } from '../profile/profile';
import { authProfile } from '../profile/profile.data';
import { User } from './auth';
import { authUser } from './auth.data';

export type AuthStoreState = {
  isAuthenticated: boolean;
  authUser: User | null;
  authProfile: Profile | null;
  signOutModalOpen: boolean;
  toggleSignOutModal(open: boolean): void;
};

export type AuthStoreActions = {
  signIn(): void;
  signOut(): void;
};

export const useAuthStore = create<AuthStoreState & AuthStoreActions>((set) => ({
  isAuthenticated: false,
  authUser: null,
  authProfile: null,
  signOutModalOpen: false,
  signIn() {
    set({ isAuthenticated: true, authUser, authProfile });
  },
  signOut() {
    set({ isAuthenticated: false, authUser: null, authProfile: null });
  },
  toggleSignOutModal(open) {
    set({ signOutModalOpen: open });
  },
}));
