import { createSelectorHooks } from 'auto-zustand-selectors-hook';

import {create} from 'zustand';
import { produce } from 'immer';
import { Booking } from '@/types/book';

type AuthStoreType = {
  data: Booking | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setData: (data:Booking) => void;
  getData: () => void;
};

const useBooktoreBase = create<AuthStoreType>((set) => ({
  data: null,
  isAuthenticated: false,
  isLoading: true,
  setData: (data) => {
    localStorage.setItem("booking",JSON.stringify(data))
    set(
      produce<AuthStoreType>((state) => {
        state.isAuthenticated = true;
        state.data = data;
      })
    );
  },
  getData: () => {
    try {
      const data = JSON.parse(localStorage.getItem('booking') || "[]")
      set(
        produce<AuthStoreType>((state) => {
          state.data = data;
        })
      );
    } catch (err) {
      localStorage.removeItem('booking');
    }
  }
}));

const useBookStore = createSelectorHooks(useBooktoreBase);

export default useBookStore;
