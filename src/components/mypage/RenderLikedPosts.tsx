import { MouseEvent, memo } from 'react';

import styles from './Mypage.module.scss';
import { Liked } from './LikedPosts';
import { IoIosHeart } from '@react-icons/all-files/io/IoIosHeart';

interface RenderLikedPostsProps {
  like: Liked;
  onCancleLikedPost: (likeId: string) => void;
  onMoveToDocument: (likeId: string) => void;
}

// eslint-disable-next-line react/display-name
const RenderLikedPosts = memo(
  ({ like, onCancleLikedPost, onMoveToDocument }: RenderLikedPostsProps) => {
    return (
      <div
        className={styles.myactive__posts__box__item}
        onClick={() => onMoveToDocument(like.id)}
      >
        <span>{like.data.title}</span>
        <div>
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onCancleLikedPost(like.id);
            }}
          >
            <IoIosHeart color={'#fd0000'} size={20} />
          </button>
        </div>
      </div>
    );
  },
);

export default RenderLikedPosts;
