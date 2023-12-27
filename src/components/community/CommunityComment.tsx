/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from 'react';
import styles from './CommunityComment.module.scss';
import CommunityCommentItem from './CommunityCommentItem';
import useUserStore from '@/store/useUsersStore';
import {
  addComment,
  deleteCommunity,
  editCommunity,
} from '@/lib/firebaseQueryCommunity';
import useCommunityDataList from '@/hook/useCommunityDataList';
import { ConvertTimes } from '@/lib/util/convertTime';

interface CommunityData {
  userName: string;
  createdAt: string;
  id: string;
  category: string;
}

const CommunityComment = ({ id }: any) => {
  const { user } = useUserStore();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editText, setEditText] = useState('');
  const [communityList, setCommunityList] = useState<CommunityData[]>([]);

  console.log(isLoading, setEditText);

  const communityId = id;

  // 댓글 내용 받아오기
  const { commentsList } = useCommunityDataList(`/community/${id.id}/comments`);

  useEffect(() => {
    setCommunityList(commentsList);
  }, [commentsList]);

  const handleChangeComment = (e: any) => {
    setComment(e.target.value);
  };

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
      console.log('댓글 입력 완료');

      setCommunityList(
        (prevComments: CommunityData[]) =>
          [newComment, ...prevComments] as CommunityData[],
      );
    } catch (error) {
      console.error(error);
    } finally {
      setComment('');
      setLoading(false);
    }
  };

  /** 댓글 삭제 기능 */
  const onDelete = async (item: any) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');
    console.log('댓글 삭제 요청');

    // 연속으로 댓글 삽입 후 삭제 버튼을 한번 실행하면 연속으로 작성한 댓글 모두 화면에서 사라짐
    if (confirm && user?.uid) {
      try {
        await deleteCommunity(
          `community/${communityId.id}/comments/${item.id}`,
        );
        console.log(`community/${communityId.id}/comments/${item.id}`);
        setCommunityList((prevComments) =>
          prevComments.filter((comment) => comment.id !== item.id),
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onEditModeOn = () => {
    setEditMode(true);
  };

  const onEditModeOff = async (item: any) => {
    setIsLoading(true);

    try {
      if (user) {
        await editCommunity(`community/${communityId.id}/comments/${item.id}`, {
          description: editText,
        });
      }
      setEditMode(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
      <div className={styles.commentTitle}>댓글</div>
      {/* 댓글 리스트 영역 */}
      <div className={styles.commentList}>
        {communityList.length > 0 ? (
          <>
            {communityList?.map((item) => (
              <>
                <>
                  <div className={styles.infoBox}>
                    <div className={styles.userBox}>
                      <div className={styles.usersImg}>
                        {/* <img src={`/${item.userImg}`} /> */}
                      </div>
                      <div>{item.userName}</div>
                    </div>
                    <div
                      className={styles.userBox}
                      style={{ display: 'flex', gap: '6px' }}
                    >
                      <div className={styles.createdAtText}>
                        <ConvertTimes data={item.createdAt} />
                      </div>
                      {communityId && user?.uid ? (
                        <>
                          {/* 수정을 클릭하면 수정 모드로 변경 */}
                          <div
                            className={styles.editText}
                            onClick={() =>
                              editMode ? onEditModeOff(item) : onEditModeOn
                            }
                          >
                            수정
                          </div>
                          <div
                            className={styles.deleteText}
                            onClick={() => onDelete(item)}
                          >
                            삭제
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </>

                <CommunityCommentItem
                  key={item.id}
                  value={item}
                  id={communityId.id}
                />
              </>
            ))}
          </>
        ) : (
          <div>등록된 댓글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default CommunityComment;
