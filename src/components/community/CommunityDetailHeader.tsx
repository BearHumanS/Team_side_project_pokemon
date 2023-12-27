import styles from './CommunityDetailHeader.module.scss';
import { ButtonCategory, ButtonDel, ButtonEdit } from '../button/Button';
import { MdRemoveRedEye } from '@react-icons/all-files/md/MdRemoveRedEye';
import { MdModeComment } from '@react-icons/all-files/md/MdModeComment';
import { IoIosHeart } from '@react-icons/all-files/io/IoIosHeart';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/useUsersStore';
import { deleteCommunity } from '@/lib/firebaseQueryCommunity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CommunityDetailHeader = ({ data, id }: any) => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  console.log('게시물 위치 코드', id.id);
  console.log('게시물 생성한 아이디', user?.uid);

  const onDelete = async () => {
    console.log('게시물 삭제 요청', id.id);
    const confirm = window.confirm('해당 글을 삭제하시겠습니까?');

    if (confirm && user?.uid) {
      try {
        await deleteCommunity(`community/${id.id}`);
        navigate(`/community`);
        console.log('글이 삭제 되었습니다.');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <ButtonCategory data={data.category} />
      <div className={styles.titleStyle}>{data.title}</div>
      <div className={styles.infoBox}>
        <div className={styles.userBox}>
          <div className={styles.usersImg}>
            {/* <img src={`/${data.userImg}`} /> */}
          </div>
          <div>{data.userName}</div>
        </div>
        {/* 게시물ID와 로그인한ID가 참이면 표시 */}
        {id.id && user?.uid ? (
          <div className={styles.editDelBox}>
            <div
              onClick={() => {
                navigate(`/community/edit`, { state: { data, id } });
              }}
            >
              <ButtonEdit data="글 수정" />
            </div>
            <div onClick={() => onDelete()}>
              <ButtonDel data="삭제" />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={styles.dateBox}>
        <div className={styles.createdAtStyle}>{data.createdAt}</div>
        <div className={styles.countBox}>
          <div className={styles.comment}>
            <MdModeComment />
            12
          </div>
          <div className={styles.view}>
            <MdRemoveRedEye />
            {data.views}
          </div>
          <div className={styles.like}>
            <IoIosHeart />
            {data.likes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailHeader;
