import Image from 'next/image';
import { storage } from '@/firebase';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import styles from './CommunityCardItem.module.scss';
import { ConvertTime } from '@/lib/util/convertTime';
import { PROFILE_DEFAULT_IMG } from '@/lib/constants';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { IoIosHeart } from '@react-icons/all-files/io/IoIosHeart';
import { FetchProfileImages } from '@/lib/util/fetchProfileImages';
import { MdRemoveRedEye } from '@react-icons/all-files/md/MdRemoveRedEye';

export const fetchProfileImages = async (userId: string) => {
  const fileRef = ref(storage, `${userId}`);
  const result = await listAll(fileRef);
  const valData = await Promise.all(
    result.items.map(async (item) => await getDownloadURL(item)),
  );
  return valData;
};

const CommunityCardItem = ({ data }: any) => {
  const router = useRouter();
  const { data: imageUrl }: any = useQuery(
    ['profileImages', data.userId],
    async () => {
      if (!data.userId) return '';
      return FetchProfileImages(data.userId);
    },
  );

  const likeCount = data.likes ? data.likes.length : 0;

  const handleToDetail = () => {
    router.push(`/community/detail/${data.id}`);
  };

  const maxLength = 15;

  return (
    <div className={styles.container} onClick={handleToDetail}>
      <div className={styles.titleImg}>
        <Image src={`/${data.postImg}`} alt="." width={280} height={140} />
      </div>
      <div className={styles.innerBox}>
        <div className={styles.titleItem}>
          {data.title.length > maxLength
            ? data.title.slice(0, maxLength) + '...'
            : data.title}
        </div>
        <div className={styles.userBox}>
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
          <div>{data.userName}</div>
        </div>
        <div className={styles.footer}>
          <div className={styles.likesViewsBox}>
            {/* <div className={styles.comment}>
            <MdModeComment />
            {communityLists.length}
          </div> */}
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
