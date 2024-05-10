import { create } from 'zustand';
import { Liked } from '@/components/mypage/LikedPosts';

interface LikesPostState {
  likes: Liked[];
  setLikes: (likes: Liked[]) => void;
  removeLike: (likeId: string | undefined) => void;
}

const useLikesPostStore = create<LikesPostState>((set) => ({
  likes: [],
  setLikes: (likes) => set({ likes }),
  removeLike: (likeId) =>
    set((state) => ({
      likes: state.likes.filter((like) => like.id !== likeId),
    })),
}));

export default useLikesPostStore;
