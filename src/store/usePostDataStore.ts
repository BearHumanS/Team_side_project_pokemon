import { PostData } from '@/components/mypage/MyPosts';
import { create } from 'zustand';

interface usePostDataStoreProps {
  postData: PostData;
  setPostData: (data: PostData) => void;
}

const usePostDataStore = create<usePostDataStoreProps>((set) => ({
  postData: {} as PostData,
  setPostData: (data: PostData) => set(() => ({ postData: data })),
}));

export default usePostDataStore;
