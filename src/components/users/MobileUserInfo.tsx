import SelectMyInfo from './SelectMyInfo';
import styles from './SocialLogin.module.scss';

const MobileUserInfo = ({
  isOpen,
  onMoveMyPage,
  onLogout,
}: {
  isOpen?: boolean;
  onMoveMyPage: () => void;
  onLogout: () => void;
}) => {
  return (
    <>
      <div className={styles.mobile__login__top}>나의 메뉴</div>
      <SelectMyInfo
        isOpen={isOpen}
        onMoveMyPage={onMoveMyPage}
        onLogout={onLogout}
      />
    </>
  );
};

export default MobileUserInfo;
