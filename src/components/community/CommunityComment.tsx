/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/firebase';
import useUserStore from '@/store/useUsersStore';
import styles from './CommunityComment.module.scss';
import { FormEvent, useEffect, useState } from 'react';
import CommunityCommentItem from './CommunityCommentItem';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { getDocument, setDocument } from '@/lib/firebaseQueryCommunity';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { addComment, deleteCommunity } from '@/lib/firebaseQueryCommunity';
import { useQuery, useQueryClient } from 'react-query';
import { deleteDocument } from '@/lib/firebaseQuery';

interface CommunityData {
  id: string;
  heart: boolean;
  userName: string;
  category: string;
  createdAt: string;
  description: string | number | readonly string[] | undefined;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCommunityCommentQuery = (id: any) => {
  return useQuery(
    ['comments', id.id],
    async () => {
      const snapshot = await getDocs(
        collection(db, `community/${id.id}/comments`),
      );
      const commentsData: CommunityData[] = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as CommunityData,
      );

      return commentsData.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    },
    { suspense: true },
  );
};

const CommunityComment = ({ id, data }: any) => {
  const { user } = useUserStore();
  const [heart, setHeart] = useState(false);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [communityList, setCommunityList] = useState<CommunityData[]>([]);
  const queryClient = useQueryClient();

  const communityId = id;

  const { data: communityLists }: any = useCommunityCommentQuery(id);

  useEffect(() => {
    fetchHeartState();
    const unsubscribe = onSnapshot(
      collection(db, `community/${id.id}/comments`),
      (snapshot) => {
        const commentsData: CommunityData[] = [];
        snapshot.docs.map((doc) => {
          commentsData.push({ id: doc.id, ...doc.data() } as CommunityData);
        });
        commentsData.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        setCommunityList(commentsData);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [id.id]);

  const handleChangeComment = (e: any) => {
    setComment(e.target.value);
  };

  // 댓글 추가 요청 기능
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (!user?.uid) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const newComment = {
        description: comment,
        userId: user?.uid,
        userName: user?.displayName,
        createdAt: new Date().toISOString(),
        userImg: '회원 가입시 유저이미지를 파이어스토어에 등록한다.',
      };

      await addComment(`community/${communityId.id}/comments/`, newComment);

      // 댓글이 추가되면 'comments' 쿼리를 다시 실행하여 데이터를 업데이트
      queryClient.invalidateQueries(['comments', id.id]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setComment('');
    }
  };

  /** 댓글 삭제 기능 */
  const onDelete = async (item: any) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');

    // 연속으로 댓글 삽입 후 삭제 버튼을 한번 실행하면 연속으로 작성한 댓글 모두 화면에서 사라짐
    if (confirm && user?.uid) {
      try {
        await deleteCommunity(
          `community/${communityId.id}/comments/${item.id}`,
        );
        setCommunityList((prevComments) =>
          prevComments.filter((comment) => comment.id !== item.id),
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 찜 상태 가져오기
  const fetchHeartState = async () => {
    if (!user?.uid || !communityId.id) return false;

    try {
      const heartSnap = await getDocument(
        `/heart/${user?.uid}/like/${communityId.id}`,
      );
      if (heartSnap) {
        return setHeart(true);
      }
    } catch (error) {
      console.error('찜 상태를 가져오는 중 에러 발생:', error);
    }

    return setHeart(false);
  };

  // const fetchHeartStateConsolTest = async () => {
  //   try {
  //     const likeCollectionRef = collection(db, `/heart/${user?.uid}/like`);
  //     const querySnapshot = await getDocs(likeCollectionRef);
  //     querySnapshot.forEach((doc) => {
  //       console.log('데이터 확인', doc.data());
  //     });
  //   } catch (error) {
  //     console.error('문서 가져오기 실패:', error);
  //   }
  // };

  // fetchHeartStateConsolTest();

  const onToggleHeart = async () => {
    if (!user?.uid) return;

    const heartSnap: any = await getDocument(
      `/heart/${user?.uid}/like/${communityId.id}`,
    );

    console.log(`/heart/${user?.uid}/like/${communityId.id}`);

    if (heartSnap) {
      await deleteDocument(`/heart/${user?.uid}/like/${communityId.id}`);
    } else {
      await setDocument(`/heart/${user?.uid}/like/${communityId.id}`, {
        userId: user?.uid,
        postId: data.id,
        title: data.title,
        createdAt: data.createdAt,
      });
    }

    // 토글 상태 변경
    setHeart((prev) => !prev);
  };

  return (
    <>
      <div
        className={
          heart
            ? `${styles.heartButton} ${styles.Outline}`
            : `${styles.heartButton}`
        }
        onClick={onToggleHeart}
      >
        {heart ? <AiFillHeart /> : <AiOutlineHeart />}
        <div className={styles.heartText}>찜하기</div>
      </div>
      <div className={styles.border} />
      <div className={styles.container}>
        {/* 댓글 입력 영역 */}
        <div className={styles.commentBox}>
          <div className={styles.commentTitle}>댓글 쓰기</div>
          {loading ? <div>등록 중..</div> : ''}
          <form onSubmit={onSubmit}>
            <div className={styles.commentTextBox}>
              <textarea
                onChange={handleChangeComment}
                placeholder="댓글을 입력해주세요."
              />
            </div>
            <div className={styles.commentButtonBox}>
              <button className={styles.ButtonStyle} type="submit">
                저장
              </button>
            </div>
          </form>
        </div>
        <div className={styles.commentTitle}>
          댓글{`(${communityLists.length})`}
        </div>
        {/* 댓글 리스트 영역 */}
        <div className={styles.commentList}>
          {communityList.length > 0 ? (
            <div>
              {communityList?.map((item) => (
                <div key={item.id}>
                  <div className={styles.infoBox}></div>
                  <CommunityCommentItem
                    key={item.id}
                    value={item}
                    id={communityId.id}
                    onDel={onDelete}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>등록된 댓글이 없습니다.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommunityComment;
