import { memo } from 'react';
import { PostData, Posts } from './MyPosts';
import styles from './Mypage.module.scss';

interface RenderPostProps {
  post: Posts;
  onDelete: (postId: string) => void;
  onEdit: (data: PostData, id: string) => void;
}

const RenderPost = memo(({ post, onDelete, onEdit }: RenderPostProps) => {
  return (
    <div className={styles.myactive__posts__box__item}>
      <span>{post.data.title}</span>
      <div className={styles.myactive__posts__box__btn__group}>
        <button
          onClick={() => {
            onEdit(post.data, post.id);
          }}
        >
          수정
        </button>
        <button onClick={() => onDelete(post.id)}>삭제</button>
      </div>
    </div>
  );
});

export default RenderPost;
