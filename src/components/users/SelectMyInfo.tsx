import styles from './SocialLogin.module.scss';

const SelectMyInfo = ({
  isOpen,
  onMoveMyPage,
  onLogout,
}: {
  isOpen?: boolean;
  onMoveMyPage: () => void;
  onLogout: () => void;
}) => {
  return (
    <div
      className={`${styles.socialLogin__dropdown} ${
        isOpen ? styles.socialLogin__dropdown__visible : ''
      }`}
    >
      <div className={styles.socialLogin__dropdown__button__box}>
        <button
          type="button"
          className={styles.socialLogin__dropdown__button__mypage}
          onClick={onMoveMyPage}
        >
          마이페이지
        </button>
        <button
          type="button"
          className={styles.socialLogin__dropdown__button__logout}
          onClick={onLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default SelectMyInfo;
