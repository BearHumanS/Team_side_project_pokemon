'use client';

import ReactQuill from 'react-quill';
import { Input, Select } from 'antd';
import useUserStore from '@/store/useUsersStore';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CommunityEditTextEditor.module.scss';
import { editCommunity } from '@/lib/firebaseQueryCommunity';
import usePostDataStore from '@/store/usePostDataStore';

const CommunityEditTextEditor = () => {
  const { user } = useUserStore();
  const { postData: data, setPostData } = usePostDataStore();
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(data.category);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setCategory(data.category);
    }
  }, [data]);

  const handleChange = (value: string) => {
    setCategory(value);
    setPostData({ ...data, category: value });
  };

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
    setPostData({ ...data, title: e.target.value });
  };

  const handleChanges = (value: any) => {
    setDescription(value);
    setPostData({ ...data, description: value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (!user?.uid) {
      alert('로그인이 필요합니다.');
      return;
    } else if (!description) {
      alert('게시글을 저장하려면 내용을 채워주세요');
      return;
    } else if (!title) {
      alert('게시글을 저장하려면 제목을 채워주세요.');
      return;
    }

    try {
      await editCommunity(`community/${data.id}`, {
        title,
        description,
        postImg: 'community_img.png',
        updateAt: new Date().toISOString(),
      });
      setPostData({ ...data, title, description, category });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      router.push(`/community`);
    }
  };

  return (
    <div className={styles.container}>
      {loading ? <div>등록 중..</div> : ''}
      <form onSubmit={onSubmit}>
        <div className={styles.inputBox}>
          <div>
            <div className={styles.inputTitle}>카테고리</div>
            <Select
              className={styles.inputSelect}
              defaultValue={category}
              style={{ width: 130 }}
              onChange={handleChange}
              disabled
              options={[
                { value: '공지사항', label: '공지사항' },
                { value: '자유게시판', label: '자유게시판' },
                { value: '질문/답변', label: '질문/답변' },
                { value: '팁/정보', label: '팁/정보' },
                { value: '거래게시판', label: '거래게시판' },
                { value: '자랑하기', label: '자랑하기' },
              ]}
            />
          </div>
          <div className={styles.inputTitleContainer}>
            <div className={styles.inputTitle}>제목</div>
            <Input
              className={styles.inputTextBox}
              count={{ show: true, max: 50 }}
              defaultValue={title}
              onChange={handleChangeTitle}
            />
          </div>
        </div>
        <ReactQuill
          className={styles.reactQuill}
          style={{ height: '400px' }}
          value={description}
          onChange={handleChanges}
        />
        <div className={styles.textEditerSubmitButton}>
          <button className={styles.ButtonLgStyle} type="submit">
            수정
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommunityEditTextEditor;
