/* eslint-disable @typescript-eslint/no-explicit-any */
import { storage } from '@/firebase';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from './CommunityCardItem.module.scss';
import { ConvertTime } from '@/lib/util/convertTime';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { IoIosHeart } from '@react-icons/all-files/io/IoIosHeart';
import { MdRemoveRedEye } from '@react-icons/all-files/md/MdRemoveRedEye';

// eslint-disable-next-line react-refresh/only-export-components
export const fetchProfileImages = async (userId: any) => {
  const fileRef = ref(storage, `${userId}`);
  const result = await listAll(fileRef);
  const valData = await Promise.all(result.items.map(async (item) => await getDownloadURL(item)));
  return valData;
};

const CommunityCardItem = ({ data }: any) => {
  const navigate = useNavigate();
  const { data: imageUrl }: any = useQuery(['profileImages', data.userId], () => fetchProfileImages(data.userId));

  const likeCount = data.likes ? data.likes.length : 0;

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
            <img src={imageUrl} />
          </div>
          <div>{data.userName}</div>
        </div>
        {/* <div className={styles.descriptionItem}>{data.description}</div> */}
        <div className={styles.footer}>
          <div className={styles.likesViewsBox}>
            <div className={styles.like}>
              <IoIosHeart />
              {likeCount}
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
