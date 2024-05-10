import Image from 'next/image';
import { storage } from '@/firebase';
import { useParams } from 'next/navigation';
import useUserStore from '@/store/useUsersStore';
import { ConvertTimes } from '@/lib/util/convertTime';
import { ChangeEvent, useEffect, useState } from 'react';
import { editReplies } from '@/lib/firebaseQueryCommunity';
import styles from './CommunityCommentItemReply.module.scss';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { PROFILE_DEFAULT_IMG } from '@/lib/constants';

const CommunityCommentItemReply = ({ data, val, setReplyList, onDel }: any) => {
  const value = data;
  const { user } = useUserStore();
  const [replyEditMode, setReplyEditMode] = useState(false);
  const [editText, setEditText] = useState(value.description);
  const [imageUrl, setImageUrl] = useState('');
  const currentUrl = useParams();

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

  /** 대댓글 수정 요청 */
  const onReplyEditSubmit = async (value: any, val: any) => {
    if (!user?.uid) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const newEditComment = {
        id: value.id,
        description: editText,
        updateAt: new Date().toISOString(),
      };

      await editReplies(
        `community/${currentUrl.id}/comments/${val}/replies/${value.id}`,
        newEditComment,
      );

      // 수정한 대댓글 리스트에 추가하여 화면에 랜더링
      setReplyList(newEditComment);
    } catch (error) {
      console.error(error);
    } finally {
      setReplyEditMode(false);
    }
  };

  /** 수정 토글 */
  const onReplyEditModeOn = () => {
    setReplyEditMode(true);
  };

  const onReplyChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setEditText(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <div className={styles.infoBox}>
          <div className={styles.userEditBox}>
            <div className={styles.userBox}>
              <div className={styles.userBoxMobile}>
                <div className={styles.usersImg}>
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

            <div
              className={styles.userBox}
              style={{ display: 'flex', gap: '6px' }}
            >
              <div className={styles.createdAtText}>
                <ConvertTimes data={value.createdAt} />
              </div>
              {data.userId === user?.uid ? (
                <div className={styles.editBox}>
                  <div
                    className={styles.replyText}
                    onClick={() => onReplyEditModeOn()}
                  >
                    수정
                  </div>
                  <div
                    className={styles.deleteText}
                    onClick={() => onDel(value)}
                  >
                    삭제
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>

        {replyEditMode ? (
          <>
            <div className={styles.commentTextBox}>
              <textarea
                required
                maxLength={300}
                value={editText}
                onChange={onReplyChangeText}
                placeholder="수정할 내용을 입력해주세요"
              />
            </div>
            <div className={styles.ButtonStyleBox}>
              <div
                className={styles.ButtonStyle}
                onClick={() => setReplyEditMode(false)}
              >
                취소
              </div>
              <div
                className={styles.ButtonStyle}
                onClick={() => onReplyEditSubmit(value, val)}
              >
                저장
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.commentTextBox}>{value.description}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityCommentItemReply;
