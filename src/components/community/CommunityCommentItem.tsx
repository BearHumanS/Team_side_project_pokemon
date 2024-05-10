import Image from 'next/image';
import { storage } from '@/firebase';
import useUserStore from '@/store/useUsersStore';
import { getDocument } from '@/lib/firebaseQuery';
import { ConvertTimes } from '@/lib/util/convertTime';
import styles from './CommunityCommentItem.module.scss';
import useCommunityDataList from '@/hook/useCommunityDataList';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import CommunityCommentItemReply from './CommunityCommentItemReply';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  addReplies,
  deleteCommunity,
  editComment,
} from '@/lib/firebaseQueryCommunity';
import { PROFILE_DEFAULT_IMG } from '@/lib/constants';

interface CommunityData {
  id: string;
  category: string;
}
const CommunityCommentItem = ({ value, id, onDel }: any) => {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('댓글을 작성해주세요.');
  const [replyList, setReplyList] = useState<CommunityData[]>([]);
  const [toggleReplies, setToggleReplies] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const communityId = id;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fileRef = ref(storage, `${value.userId}`);
        const result = await listAll(fileRef);
        const valData: any = await Promise.all(
          result.items.map(async (item) => await getDownloadURL(item)),
        );

        // 중복된 이미지 URL을 필터링하여 새로운 이미지만 추가
        setImageUrl(valData);
      } catch (error) {
        console.error('이미지를 가져오는 중 오류 발생:', error);
      }
    };
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 대댓글 내용 받아오기 */
  const { repliesList } = useCommunityDataList(
    `/community/${communityId}/comments/${value.id}/replies`,
  );

  /** ID값의 댓글 상세내용 받아오기 */
  useEffect(() => {
    setReplyList(repliesList.reverse());
    const fetchData = async () => {
      try {
        const commentsItem = await getDocument(
          `/community/${communityId}/comments/${value.id}`,
        );
        if (commentsItem) {
          // 문서 스냅샷에서 데이터 추출 data()는 파이어스토어 제공 메서드, description 값을 가져온다.
          setEditText(commentsItem.data().description);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [repliesList, communityId, value.id]);

  /** 댓글 수정 요청 */
  const onEditSubmit = async (value: any) => {
    setLoading(true);

    if (!user?.uid) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const newEditComment = {
        description: editText,
        updateAt: new Date().toISOString(),
      };

      await editComment(
        `community/${communityId}/comments/${value.id}`,
        newEditComment,
      );

      // 수정한 댓글 값을 editText에 전달
      setEditText(newEditComment.description);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setComment('');
      setEditMode(false);
    }
  };

  /** 대댓글 내용 상태 */
  const handleChangeComment = (e: any) => {
    setComment(e.target.value);
  };

  /** 대댓글 추가 기능 */
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
          [...prevComments, newComment] as CommunityData[],
      );
      setComment('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      toggleHandler();
    }
  };

  /** 대댓글 삭제 기능 */
  const onDelete = async (item: any) => {
    const confirm = window.confirm('해당 글을 삭제하시겠습니까?');

    if (confirm && user?.uid) {
      try {
        await deleteCommunity(
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
    if (user?.uid) {
      setToggleReplies((prevToggleReplies) => !prevToggleReplies);
    } else {
      return alert('로그인이 필요합니다.');
    }
  };

  /** 댓글 내용 상태 */
  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setEditText(value);
  };

  const onEditModeOn = () => {
    setEditMode(true);
    setEditText(value.description);
  };

  const handleSetReplyList = (newReplyList: any) => {
    setReplyList((prevReplyList) => {
      const updatedReplies = prevReplyList.map((reply: any) =>
        reply.id === newReplyList.id
          ? { ...reply, description: newReplyList.description }
          : reply,
      );
      return updatedReplies;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoBox}>
        <div className={styles.userBox}>
          <div className={styles.userBoxMobile}>
            <div className={styles.usersImg}>
              {/* 이미지 넣기 */}
              {imageUrl ? (
                <Image
                  src={imageUrl.toString()}
                  alt="유저 이미지"
                  width={21}
                  height={21}
                />
              ) : (
                <Image
                  src={PROFILE_DEFAULT_IMG}
                  alt="유저 이미지"
                  width={21}
                  height={21}
                />
              )}
            </div>
            <div>{value.userName}</div>
          </div>
          <div className={styles.createdAtTextTop}>
            <ConvertTimes data={value.createdAt} />
          </div>
        </div>
        <div className={styles.userBox} style={{ display: 'flex', gap: '6px' }}>
          <div className={styles.createdAtText}>
            <ConvertTimes data={value.createdAt} />
          </div>
          <div className={styles.editDelBox}>
            {value.userId === user?.uid ? (
              <div className={styles.editText} onClick={() => onEditModeOn()}>
                수정
              </div>
            ) : (
              ''
            )}
            {value.userId === user?.uid ? (
              <>
                <div className={styles.deleteText} onClick={() => onDel(value)}>
                  삭제
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      {editMode ? (
        <div className={styles.commentTextBox}>
          <textarea
            required
            maxLength={300}
            value={editText}
            onChange={onChangeText}
            placeholder="수정할 내용을 입력해주세요"
          />
        </div>
      ) : (
        <div className={styles.commentTextBox}>
          {editText || value.description}
          {/* editMode가 true일 때 editText를 사용 */}
        </div>
      )}

      {editMode ? (
        <div className={styles.ButtonStyleBox}>
          <div
            className={styles.ButtonStyle}
            onClick={() => setEditMode(false)}
          >
            취소
          </div>
          <div
            className={styles.ButtonStyle}
            onClick={() => onEditSubmit(value)}
          >
            저장
          </div>
        </div>
      ) : (
        <div className={styles.editBox}>
          <div
            className={styles.replyText}
            onClick={() => {
              toggleHandler();
            }}
          >
            답글 달기
          </div>
        </div>
      )}

      {/* 대댓글 추가 영역 */}
      {loading ? <div>등록 중..</div> : ''}
      {toggleReplies ? (
        <form onSubmit={onSubmit}>
          <div className={styles.formBox}>
            <div className={styles.replyIcon} />
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
          <div key={val.id} className={styles.container}>
            <div className={styles.infoBox}>
              <div className={styles.replyBox}>
                <div className={styles.replyIcons} />
              </div>
              <CommunityCommentItemReply
                data={val}
                val={value.id}
                setReplyList={handleSetReplyList}
                onDel={onDelete}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityCommentItem;
