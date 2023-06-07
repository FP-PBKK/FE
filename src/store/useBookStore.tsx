import { createSelectorHooks } from 'auto-zustand-selectors-hook';

import {create} from 'zustand';
import { produce } from 'immer';

type Booking = {
  data : string,
  total:number
}

type BookStoreType = {
  data: Booking | null ;
  isLoading: boolean;
  setData: (data:Booking) => void;
  getData: () => void;
  removeData: ()=> void;
};

const useBooktoreBase = create<BookStoreType>((set) => ({
  data: null,
  isAuthenticated: false,
  isLoading: true,
  setData: (data) => {
    localStorage.setItem("booking",JSON.stringify(data))
    set(
      produce<BookStoreType>((state) => {
        state.data = data;
      })
    );
  },
  getData: () => {
    try {
      const data = JSON.parse(localStorage.getItem('booking') || "[]")
      set(
        produce<BookStoreType>((state) => {
          state.data = data;
        })
      );
    } catch (err) {
      localStorage.removeItem('booking');
    }
  },
  removeData:()=>{
    set(
      produce<BookStoreType>((state) => {
        state.data= null;
      })
    );
  }
}));

const useBookStore = createSelectorHooks(useBooktoreBase);

export default useBookStore;
