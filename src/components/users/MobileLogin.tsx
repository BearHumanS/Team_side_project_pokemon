import { MouseEvent } from 'react';
import SelectLogin from './SelectLogin';
import styles from './SocialLogin.module.scss';

const MobileLogin = ({
  isOpen,
  onLogin,
}: {
  isOpen?: boolean;
  onLogin: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <>
      <div className={styles.mobile__login__top}>로그인</div>
      <SelectLogin isOpen={isOpen} onLogin={onLogin} />
    </>
  );
};

export default MobileLogin;
