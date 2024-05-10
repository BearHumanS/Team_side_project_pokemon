import { MouseEvent, memo } from 'react';
import { PostData, Posts } from './MyPosts';
import styles from './Mypage.module.scss';

interface RenderPostProps {
  post: Posts;
  onDelete: (postId: string) => void;
  onEdit: (data: PostData, id: string) => void;
  onMovetoDocument: (postId: string) => void;
}

// eslint-disable-next-line react/display-name
const RenderPost = memo(
  ({ post, onDelete, onEdit, onMovetoDocument }: RenderPostProps) => {
    return (
      <div
        className={styles.myactive__posts__box__item}
        onClick={() => onMovetoDocument(post.id)}
      >
        <span>{post.data.title}</span>
        <div className={styles.myactive__posts__box__btn__group}>
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onEdit(post.data, post.id);
            }}
          >
            수정
          </button>
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onDelete(post.id);
            }}
          >
            삭제
          </button>
        </div>
      </div>
    );
  },
);

export default RenderPost;
