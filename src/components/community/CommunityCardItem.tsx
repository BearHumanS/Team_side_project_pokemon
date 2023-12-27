import styles from './CommunityCardItem.module.scss';
import { MdRemoveRedEye } from '@react-icons/all-files/md/MdRemoveRedEye';
import { IoIosHeart } from '@react-icons/all-files/io/IoIosHeart';
import { useNavigate } from 'react-router-dom';
import { ConvertTime } from '@/lib/util/convertTime';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CommunityCardItem = ({ data }: any) => {
  const navigate = useNavigate();
  const handleToDetail = () => {
    navigate(`/community/detail/${data.id}`);
  };

  return (
    <div className={styles.container} onClick={handleToDetail}>
      <div className={styles.titleImg}>
        <img src={`src/assets/${data.postImg}`} />
      </div>
      <div className={styles.innerBox}>
        <div className={styles.titleItem}>{data.title}</div>
        <div className={styles.userBox}>
          <div className={styles.usersImg}>
            {/* <img src={data.userImg} /> */}
          </div>
          <div>{data.userName}</div>
        </div>
        {/* <div className={styles.descriptionItem}>{data.description}</div> */}
        <div className={styles.footer}>
          <div className={styles.likesViewsBox}>
            <div className={styles.like}>
              <IoIosHeart />
              {data.likes}
            </div>
            <div className={styles.view}>
              <MdRemoveRedEye />
              {data.views}
            </div>
          </div>
          <div className={styles.dateBox}>
            <ConvertTime data={data.createdAt} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCardItem;
