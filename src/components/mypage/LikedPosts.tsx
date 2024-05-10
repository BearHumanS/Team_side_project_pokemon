import { deleteDocument, getAllDocument } from '@/lib/firebaseQuery';
import useUserStore from '@/store/useUsersStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RenderLikedPosts from './RenderLikedPosts';
import styles from './Mypage.module.scss';
import { Pagination } from 'antd';
import { DocumentData } from 'firebase/firestore';
import useLikesPostStore from '@/store/useLikesPostStore';

export interface Liked {
  id: string;
  data: DocumentData;
}

const MyPosts = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const { likes, setLikes, removeLike } = useLikesPostStore();
  const router = useRouter();

  const { user } = useUserStore();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = likes.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const docSnap = await getAllDocument(`/heart/${user.uid}/like`);

        setLikes(docSnap);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [setLikes, user]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onCancleLikedPost = async (likeId: string) => {
    const confirm = window.confirm('해당 게시물의 좋아요를 취소하시겠습니까?');

    if (confirm && user) {
      try {
        await deleteDocument(`/heart/${user.uid}/like/${likeId}`);

        removeLike(likeId);

        const newTotal = likes.length - 1;
        const maxPage = Math.ceil(newTotal / itemsPerPage);
        if (currentPage > maxPage) {
          setCurrentPage(maxPage > 0 ? maxPage : 1);
        }
        console.log('글이 삭제 되었습니다.');
      } catch (error) {
        console.log(error);
      }
    }

    return;
  };

  const onMoveToDocument = (likeId: string) => {
    router.push(`/community/detail/${likeId}`);
  };

  return (
    <div style={{ height: '100%' }}>
      <div className={styles.myactive__posts__title}>
        <span>좋아요한 게시물</span>
      </div>
      {likes.length === 0 ? (
        <>
          <div className={styles.myactive__posts__box__none}>
            좋아요한 게시물이 없습니다.
          </div>
        </>
      ) : (
        <>
          <div className={styles.myactive__posts__box}>
            {currentItems.map((like) => (
              <RenderLikedPosts
                key={like.id}
                like={like}
                onCancleLikedPost={onCancleLikedPost}
                onMoveToDocument={onMoveToDocument}
              />
            ))}
          </div>
        </>
      )}

      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={currentPage}
          total={likes.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
};

export default MyPosts;
