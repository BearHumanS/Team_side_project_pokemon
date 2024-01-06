import { getAllDocument } from '@/lib/firebaseQuery';
import { deleteCommunity } from '@/lib/firebaseQueryCommunity';
import useUserStore from '@/store/useUsersStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RenderPost from './RenderPost';
import styles from './Mypage.module.scss';
import { Pagination } from 'antd';

export interface Posts {
  id: string;
  data: PostData;
}

export interface PostData {
  id: string;
  category: string;
  createdAt: string;
  description: string;
  likes: number;
  postImg: string;
  title: string;
  userId: string;
  userImg: string;
  userName: string;
  views: number;
}

const MyPosts = () => {
  const itemsPerPage = 4;
  const [posts, setPosts] = useState<Posts[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const { user } = useUserStore();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      const documents = await getAllDocument(`/community`);
      const filteredPosts = documents
        .map((doc) => ({
          id: doc.id,
          data: doc.data as PostData,
        }))
        .filter((post) => post.data.userId === user?.uid);

      setPosts(filteredPosts);
    };

    fetchData();
  }, [user?.uid]);

  const onEdit = (data: PostData, id: string) => {
    navigate(`/community/edit`, { state: { data, id } });
  };

  const onDelete = async (postId: string) => {
    const confirm = window.confirm('해당 글을 삭제하시겠습니까?');

    if (confirm && user?.uid) {
      try {
        await deleteCommunity(`community/${postId}`);
        navigate(`/community`);
        console.log('글이 삭제 되었습니다.');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className={styles.myactive__posts__title}>
        <span>작성한 게시물</span>
      </div>
      <div className={styles.myactive__posts__box}>
        {currentItems.map((post) => (
          <RenderPost
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={currentPage}
          total={posts.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
};

export default MyPosts;
