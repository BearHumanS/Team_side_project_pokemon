import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/useUsersStore';
import { ConvertTimes } from '@/lib/util/convertTime';
import { PROFILE_DEFAULT_IMG } from '@/lib/constants';
import styles from './CommunityDetailHeader.module.scss';
import { useCommunityCommentQuery } from './CommunityComment';
import { IoIosHeart } from '@react-icons/all-files/io/IoIosHeart';
import { MdModeComment } from '@react-icons/all-files/md/MdModeComment';
import { ButtonCategory, ButtonDel, ButtonEdit } from '../button/Button';
import {
  deleteCommunity,
  deleteDocument,
  viewCount,
} from '@/lib/firebaseQueryCommunity';
import { MdRemoveRedEye } from '@react-icons/all-files/md/MdRemoveRedEye';
import { FetchProfileImages } from '@/lib/util/fetchProfileImages';
import useLikesPostStore from '@/store/useLikesPostStore';

interface DetailHeaderProps {
  data: {
    category?: string;
    createdAt?: string;
    description?: string;
    id?: string;
    likes?: string[];
    postImg?: string;
    title?: string;
    updateAt?: string;
    userId?: string;
    userImg?: string;
    userName?: string;
    views?: number;
  };
  id: {
    id?: string;
  };
}

const CommunityDetailHeader = ({ data, id }: DetailHeaderProps) => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { removeLike } = useLikesPostStore();

  const { data: imageUrl } = useQuery(
    ['profileImages', data.userId],
    async () => {
      if (!data.userId) return '';
      return FetchProfileImages(data.userId);
    },
  );

  /** 뷰 카운트 전송 기능 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // data.id가 존재하는지 확인하고 카운트 실행
        if (data.id && typeof data.views !== 'undefined') {
          const newComment = {
            views: data.views + 1,
          };

          await viewCount(`community/${data.id}/`, newComment);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data.id, data.views]);

  const { data: communityLists = [] } = useCommunityCommentQuery(id);

  const likeCount = data.likes ? data.likes.length : 0;

  const onDelete = async () => {
    const confirm = window.confirm('해당 글을 삭제하시겠습니까?');

    try {
      if (confirm && user) {
        await deleteCommunity(`community/${id.id}`);
      }

      await deleteDocument(`/heart/${user?.uid}/like/${id.id}`);

      removeLike(id.id);

      navigate(`/community`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ButtonCategory data={data.category} />
      <div className={styles.titleStyle}>{data.title}</div>
      <div className={styles.infoBox}>
        <div className={styles.userBox}>
          <div className={styles.usersImg}>
            {imageUrl ? (
              <img src={imageUrl.toString()} alt="유저 이미지" />
            ) : (
              <img src={PROFILE_DEFAULT_IMG} alt="유저 이미지" />
            )}
          </div>
          <div>{data.userName}</div>
        </div>
        {/* 게시물ID와 로그인한ID가 참이면 표시 */}
        {data.userId === user?.uid ? (
          <div className={styles.editDelBox}>
            <div
              onClick={() => {
                navigate(`/community/edit`, { state: { data, id } });
              }}
            >
              <ButtonEdit data="글 수정" />
            </div>
            <div onClick={() => onDelete()}>
              <ButtonDel data="삭제" />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={styles.dateBox}>
        <div className={styles.createdAtStyle}>
          <ConvertTimes data={data.createdAt} />
        </div>
        <div className={styles.countBox}>
          <div className={styles.comment}>
            <MdModeComment />
            {communityLists.length}
          </div>
          <div className={styles.view}>
            <MdRemoveRedEye />
            {data.views}
          </div>
          <div className={styles.like}>
            <IoIosHeart />
            {likeCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailHeader;
