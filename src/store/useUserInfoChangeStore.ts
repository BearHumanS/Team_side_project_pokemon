import { create } from 'zustand';

interface useUserInfoChangeStore {
  userName: string | null;
  imgUrl: string | null;
  setUserName: (name: string) => void;
  setImgUrl: (url: string | null) => void;
}

const useUserInfoChangeStore = create<useUserInfoChangeStore>((set) => ({
  userName: null,
  imgUrl: null,
  setUserName: (name) => set({ userName: name }),
  setImgUrl: (url) => set({ imgUrl: url }),
}));

export default useUserInfoChangeStore;
