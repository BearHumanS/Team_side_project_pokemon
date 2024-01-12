/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Select } from 'antd';
import useUserStore from '@/store/useUsersStore';
import { FormEvent, useState } from 'react';
import styles from './CommunityTextEditor.module.scss';
import { addCommunity } from '@/lib/firebaseQueryCommunity';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CommunityTextEditor = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editorRef, setEditorRef] = useState('');
  const [category, setCategory] = useState('자유게시판');
  const [title, setTitle] = useState('제목을 작성해주세요.');

  const handleChange = (value: string) => {
    setCategory(value);
  };

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    if (!user?.uid) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      let content = '';
      if (editorRef) {
        content = editorRef;
      }
      await addCommunity(`community/`, {
        likes: [],
        views: 0,
        description: content,
        title: title,
        userId: user?.uid,
        category: category,
        postImg: 'community_img.png',
        userName: user?.displayName,
        createdAt: new Date().toISOString(),
        userImg: '회원 가입시 유저이미지를 파이어스토어에 등록한다.',
      });
      setTitle('');
      setCategory('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      navigate(`/community`);
    }
  };

  const handleChanges = (value: any) => {
    setEditorRef(value);
  };

  return (
    <div>
      {loading ? <div>등록 중..</div> : ''}
      <form onSubmit={onSubmit}>
        <div className={styles.inputBox}>
          <div>
            <div className={styles.inputTitle}>카테고리</div>
            <Select
              defaultValue="자유게시판"
              style={{ width: 130 }}
              onChange={handleChange}
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
          <div>
            <div className={styles.inputTitle}>제목</div>
            <Input
              count={{ show: true, max: 50 }}
              style={{ minWidth: '1000px', display: 'flex' }}
              value={title}
              onChange={handleChangeTitle}
            />
          </div>
        </div>
        <div>
          <ReactQuill
            style={{ height: '400px' }}
            value={editorRef}
            onChange={handleChanges}
          />
        </div>
        <div className={styles.textEditerSubmitButton}>
          <button className={styles.ButtonLgStyle} type="submit">
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommunityTextEditor;
