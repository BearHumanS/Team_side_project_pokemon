import { create } from 'zustand';

interface useSearchInputText {
  inputText: string;
  setInputText: (text: string) => void;
}

const useSearchInputText = create<useSearchInputText>((set) => ({
  inputText: '',
  setInputText: (text) => set({ inputText: text }),
}));

export default useSearchInputText;
