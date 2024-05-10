import { PokemonInfoProps } from '@/lib/type';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import useUserStore from '@/store/useUsersStore';
import styles from './Comments.module.scss';

import Pagination from './Pagination';
import usePagination from '@/hook/usePagination';
import { addDocument, deleteDocument } from '@/lib/firebaseQuery';
import { FORMDATE } from '@/lib/constants';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';
export interface CommentProps {
  comment: string;
  createdAt: string;
  displayName: string;
  uid: string;
  id: string;
}

const Comments = ({ pokemonState }: PokemonInfoProps) => {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const { user } = useUserStore();
  const windowWidth = useCalculateInnerWidth();

  const { pokemon } = pokemonState;

  const perPage = windowWidth <= 768 ? 5 : 10;

  const {
    dataList: commentList,
    setDataList: setCommentList,
    fetchData: fetchComments,
    isLoading,
    hasMoreData: hasMoreComments,
  } = usePagination(`comments/${pokemon?.id}/pokemonComments`, perPage);

  useEffect(() => {
    if (pokemon?.id) {
      fetchComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon?.id]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!user?.uid) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      await addDocument(`comments/${pokemon?.id}/pokemonComments`, {
        comment,
        createdAt: new Date().toISOString(),
        displayName: user?.displayName,
        uid: user?.uid,
      });
      setComment('');
      fetchComments();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onCommentChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setComment(e.target.value);
  };

  const onDelete = async (commentId: string, commentUid: string) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');

    if (confirm && commentUid === user?.uid) {
      try {
        await deleteDocument(
          `comments/${pokemon?.id}/pokemonComments/${commentId}`,
        );
        setCommentList(
          commentList.filter((comment) => comment.id !== commentId),
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className={styles.comments__container}>
        <form onSubmit={onSubmit} className={styles.comments__main}>
          <div className={styles.comments__input__box}>
            <input
              type="text"
              name="comment"
              id="comment"
              required
              value={comment}
              onChange={onCommentChange}
              placeholder={
                user?.uid ? '댓글을 입력해주세요' : '로그인을 해주세요'
              }
              className={`${styles.comments__input__text} `}
            />
            <span
              className={`${styles.comments__length} ${
                comment.length > 100 ? styles['comments__length__max'] : ''
              }`}
            >
              {comment.length} / 100
            </span>
            <div className={styles.comments__input__btn__box}>
              <input
                type="submit"
                value="댓글 등록"
                disabled={!comment || loading || comment.length > 100}
                className={styles.comments__input__btn}
              />
            </div>
          </div>
        </form>
        <ul className={styles.comments__list__inner}>
          {commentList.length > 0 ? (
            commentList.map(({ id, comment, displayName, createdAt, uid }) => {
              const createdDate = FORMDATE(createdAt);
              return (
                <li key={id} className={styles.comments__list}>
                  <span className={styles.comments__comment__list}>
                    {comment}
                  </span>
                  <div className={styles.comments__right__side}>
                    <span className={styles.comments__list__userName}>
                      {displayName}
                    </span>
                    <span>{createdDate}</span>
                    {uid === user?.uid && (
                      <button
                        className={styles.comments__delete__btn}
                        onClick={() => onDelete(id, uid)}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <>
              <div>댓글이 없습니다.</div>
            </>
          )}
        </ul>
      </div>

      {windowWidth <= 768 && (
        <>
          <div className={styles.mobile__comments}>
            <form className={styles.mobile__comments__form} onSubmit={onSubmit}>
              <span
                className={`${styles.mobile__comments__length} ${
                  comment.length > 100
                    ? styles['mobile__comments__length__max']
                    : ''
                }`}
              >
                {comment.length} / 100
              </span>
              <textarea
                className={styles.mobile__comments__text}
                name="comment"
                id="comment"
                required
                value={comment}
                onChange={onCommentChange}
                placeholder={
                  user?.uid ? '댓글을 입력해주세요' : '로그인을 해주세요'
                }
              />

              <div className={styles.mobile__comments__btn__box}>
                <input
                  className={styles.mobile__comments__btn}
                  type="submit"
                  value="댓글 등록"
                  disabled={!comment || loading || comment.length > 100}
                />
              </div>
            </form>
            <ul className={styles.mobile__comments__list__inner}>
              {commentList.length > 0 ? (
                commentList.map(
                  ({ id, comment, displayName, createdAt, uid }) => {
                    const createdDate = FORMDATE(createdAt);
                    return (
                      <li
                        className={styles.mobile__comments__list}
                        key={createdAt}
                      >
                        <div>
                          <div className={styles.mobile__comments__list__info}>
                            <span>{displayName}</span>
                            <span>{createdDate}</span>
                          </div>
                          <div
                            className={styles.mobile__comments__list__content}
                          >
                            {comment}
                          </div>
                        </div>
                        <div
                          className={styles.mobile__comments__list__btn__box}
                        >
                          {uid === user?.uid && (
                            <button
                              className={styles.mobile__comments__list__btn}
                              onClick={() => onDelete(id, uid)}
                            >
                              삭제
                            </button>
                          )}
                        </div>
                      </li>
                    );
                  },
                )
              ) : (
                <div>댓글이 없습니다.</div>
              )}
            </ul>
          </div>
        </>
      )}
      <Pagination
        isLoading={isLoading}
        onMoveToNext={() => fetchComments('next')}
        hasMoreComments={hasMoreComments}
      />
    </>
  );
};

export default Comments;
