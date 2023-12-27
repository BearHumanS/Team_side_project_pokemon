/* eslint-disable @typescript-eslint/no-explicit-any */
import useUserStore from '@/store/useUsersStore';
import { getDocument } from '@/lib/firebaseQuery';
import { ConvertTimes } from '@/lib/util/convertTime';
import styles from './CommunityCommentItem.module.scss';
import useCommunityDataList from '@/hook/useCommunityDataList';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import CommunityCommentItemReply from './CommunityCommentItemReply';
import {
  addReplies,
  deleteCommunity,
  editCommunity,
} from '@/lib/firebaseQueryCommunity';
// import CommunityCommentItemReply from './CommunityCommentItemReply';

interface CommunityData {
  id: string;
  category: string;
}
const CommunityCommentItem = ({ value, id }: any) => {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('댓글을 작성해주세요.');
  const [replyList, setReplyList] = useState<CommunityData[]>([]);
  const [toggleReplies, setToggleReplies] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState('');

  const communityId = id;

  /** 대댓글 내용 받아오기 */
  const { repliesList } = useCommunityDataList(
    `/community/${communityId}/comments/${value.id}/replies`,
  );

  /** ID값의 댓글 상세내용 받아오기 */
  const fetchData = async () => {
    try {
      const commentsItem = await getDocument(
        `/community/${communityId}/comments/${value.id}`,
      );
      if (commentsItem) {
        // 문서 스냅샷에서 데이터 추출 data()는 파이어스토어 제공 메서드, description 값을 가져온다.
        setEditText(commentsItem.data().description);
        console.log('상세 내용 확인', editText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();

  /** 최초 대댓글 리스트 감지  */
  useEffect(() => {
    setReplyList(repliesList);
  }, [repliesList]);

  /** 댓글 내용 상태 */
  const handleChangeComment = (e: any) => {
    setComment(e.target.value);
  };

  /** 게시글 추가 기능 */
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

      await addReplies(
        `community/${communityId}/comments/${value.id}/replies/`,
        newComment,
      );

      setReplyList(
        (prevComments: CommunityData[]) =>
          [newComment, ...prevComments] as CommunityData[],
      );
      console.log('Community List:', replyList);
      setComment('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /** 대댓글 삭제 기능 */
  const onDelete = async (item: any) => {
    const confirm = window.confirm('해당 글을 삭제하시겠습니까?');
    console.log('대댓글 삭제 요청', item.id);

    if (confirm && user?.uid) {
      try {
        await deleteCommunity(
          `community/${communityId}/comments/${value.id}/replies/${item.id}`,
        );
        console.log(
          '대댓글이 삭제 되었습니다.',
          `community/${communityId}/comments/${value.id}/replies/${item.id}`,
        );
        setReplyList(replyList.filter((comment) => comment.id !== item.id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  /** 대댓글 토글 버튼 기능 */
  const toggleHandler = () => {
    setToggleReplies((prevToggleReplies) => !prevToggleReplies);
  };

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setEditText(value);
  };

  const onEditModeOff = async (item: any) => {
    try {
      if (user) {
        await editCommunity(`community/${communityId.id}/comments/${item.id}`, {
          description: editText,
        });
      }
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onEditModeOn = () => {
    setEditMode(true);
  };

  return (
    <div className={styles.container}>
      <button onClick={editMode ? onEditModeOff : onEditModeOn}>수정</button>
      <button onClick={() => setEditMode(false)}>최소</button>
      {editMode ? (
        <>
          <textarea
            required
            maxLength={300}
            value={editText}
            onChange={onChangeText}
            placeholder="수정할 내용을 입력해주세요."
          />
        </>
      ) : (
        <>
          <div className={styles.commentTextBox}>{value.description}</div>
        </>
      )}
      {/* <div className={styles.commentTextBox}>{value.description}</div> */}
      <div className={styles.userBox}>
        <div
          className={styles.replyText}
          onClick={() => {
            toggleHandler();
          }}
        >
          답글 달기
        </div>
      </div>
      {/* 대댓글 추가 영역 */}
      {loading ? <div>등록 중..</div> : ''}
      {toggleReplies ? (
        <form onSubmit={onSubmit}>
          <div className={styles.formBox}>
            <div className={styles.replyIcon}>L</div>
            <div className={styles.commentTextBox}>
              <textarea
                onChange={handleChangeComment}
                placeholder="대댓글을 입력해주세요."
              />
            </div>
          </div>
          <div className={styles.commentButtonBox}>
            <button className={styles.ButtonStyle} type="submit">
              저장
            </button>
          </div>
        </form>
      ) : (
        ''
      )}
      {/* 대댓글 리스트 영역 */}
      <div className={styles.replyListBox}>
        {replyList?.map((val: any) => (
          <div className={styles.container}>
            <div className={styles.infoBox}>
              <div className={styles.replyBox}>
                <div className={styles.replyIcons}>L</div>
                <div className={styles.userBox}>
                  <div className={styles.usersImg}>
                    {/* <img src={`/${value.userImg}`} /> */}
                  </div>
                  <div>{value.userName}</div>
                </div>
              </div>

              <div
                className={styles.userBox}
                style={{ display: 'flex', gap: '6px' }}
              >
                <div className={styles.createdAtText}>
                  <ConvertTimes data={value.createdAt} />
                </div>
                {communityId && user?.uid ? (
                  <div className={styles.editBox}>
                    <div className={styles.editText}>수정</div>
                    <div
                      className={styles.deleteText}
                      onClick={() => onDelete(val)}
                    >
                      삭제
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <CommunityCommentItemReply data={val} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityCommentItem;
