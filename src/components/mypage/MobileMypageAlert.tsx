import styles from '@/components/users/SocialLogin.module.scss';
import { useRouter } from 'next/navigation';

const MobileMypageAlert = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();

  const onMovetoMakecard = () => {
    router.push('/cardEdit');
  };
  return (
    <>
      <div className={styles.mobile__login__top}>알림</div>

      <div
        className={`${styles.socialLogin__dropdown} ${
          isOpen ? styles.socialLogin__dropdown__visible : ''
        }`}
      >
        <div className={styles.socialLogin__dropdown__box}>
          <div className={styles.socialLogin__dropdown__title}>
            카드 제작 페이지로 이동하시겠어요?
          </div>
          <button
            type="button"
            className={styles.socialLogin__dropdown__button__mypage__go}
            onClick={onMovetoMakecard}
          >
            이동하기
          </button>
          <button
            type="button"
            className={styles.socialLogin__dropdown__button__mypage__cancel}
            onClick={() => {}}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMypageAlert;
