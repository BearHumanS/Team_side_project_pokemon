import { deleteDocument, getAllDocument } from '@/lib/firebaseQuery';
import { deleteCommunity } from '@/lib/firebaseQueryCommunity';
import useUserStore from '@/store/useUsersStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RenderPost from './RenderPost';
import styles from './Mypage.module.scss';
import { Pagination } from 'antd';
import useLikesPostStore from '@/store/useLikesPostStore';
import usePostDataStore from '@/store/usePostDataStore';

export interface Posts {
  id: string;
  data: PostData;
}

export interface PostData {
  id?: string;
  category?: string;
  createdAt?: string;
  description?: string;
  likes?: string[];
  postImg?: string;
  title?: string;
  userId?: string;
  userImg?: string;
  userName?: string;
  views?: number;
}

const MyPosts = () => {
  const itemsPerPage = 4;
  const [posts, setPosts] = useState<Posts[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { removeLike } = useLikesPostStore();
  const router = useRouter();

  const { user } = useUserStore();
  const { setPostData } = usePostDataStore();

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

  const onEdit = (data: PostData) => {
    setPostData(data);
    router.push(`/community/edit`);
  };

  const onDelete = async (postId: string) => {
    const confirm = window.confirm('해당 글을 삭제하시겠습니까?');

    try {
      if (confirm && user) {
        await deleteCommunity(`community/${postId}`);
        setPosts((prev) => prev.filter((post) => post.id !== postId));
      }

      await deleteDocument(`/heart/${user?.uid}/like/${postId}`);

      removeLike(postId);

      const newTotal = posts.length - 1;
      const maxPage = Math.ceil(newTotal / itemsPerPage);
      if (currentPage > maxPage) {
        setCurrentPage(maxPage > 0 ? maxPage : 1);
      }

      console.log('글이 삭제 되었습니다.');
    } catch (error) {
      console.error(error);
    }

    return;
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onMovetoDocument = (postId: string) => {
    router.push(`/community/detail/${postId}`);
  };

  return (
    <div style={{ height: '100%' }}>
      <div className={styles.myactive__posts__title}>
        <span>작성한 게시물</span>
      </div>
      {posts.length === 0 ? (
        <>
          <div className={styles.myactive__posts__box__none}>
            작성한 게시물이 없습니다.
          </div>
        </>
      ) : (
        <>
          <div className={styles.myactive__posts__box}>
            {currentItems.map((post) => (
              <RenderPost
                key={post.id}
                post={post}
                onEdit={onEdit}
                onDelete={onDelete}
                onMovetoDocument={onMovetoDocument}
              />
            ))}
          </div>
        </>
      )}

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
